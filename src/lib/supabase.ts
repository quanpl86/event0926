import { createClient } from "@supabase/supabase-js";
import type { JourneyAnswers, JourneyStep } from "@/types/journey";
import { createProfile, createPrompt, getTags } from "./profile";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export async function saveJourney(answers: JourneyAnswers, steps: JourneyStep[]) {
  if (!answers.consent) return { cloud: false, reason: "local-only" as const };
  if (!supabase) {
    console.error("Supabase chưa được cấu hình (thiếu URL hoặc key).");
    return { cloud: false, reason: "missing-config" as const };
  }

  const profileId = crypto.randomUUID();
  const result = createProfile(answers);
  const tags = getTags(answers, steps);
  const displayName = answers.name.trim().slice(0, 40);

  const { error: profileError } = await supabase.from("student_profiles").insert({
    id: profileId,
    display_name: displayName,
    grade_band: answers.gradeBand,
    avatar_id: answers.avatar
  });
  if (profileError) {
    console.error("Không lưu được student_profiles", profileError);
    return { cloud: false, reason: profileError.message };
  }

  const interactions: {
    profile_id: string;
    step_id: string;
    response: {
      selected: string[];
      agree?: string;
      suggested?: string;
      rewritten?: string;
      canonical?: string;
      source?: string;
    };
  }[] = Object.entries(answers.selections).map(([step_id, selected]) => ({
    profile_id: profileId,
    step_id,
    response: { selected }
  }));
  if (answers.projectName) interactions.push({ profile_id: profileId, step_id: "project", response: { selected: [answers.projectName] } });
  if (answers.parentMoment) interactions.push({ profile_id: profileId, step_id: "family-mirror", response: { selected: [answers.parentMoment] } });
  if (answers.portraitAgree) interactions.push({ profile_id: profileId, step_id: "profile-child", response: { selected: [answers.portraitAgree] } });
  if (answers.parentPortraitFit) interactions.push({ profile_id: profileId, step_id: "profile-parent", response: { selected: [answers.parentPortraitFit] } });
  if (answers.portraitAgree || answers.futureSelf.trim()) {
    interactions.push({
      profile_id: profileId,
      step_id: "profile-future-self",
      response: {
        selected: [result.futureSelf],
        agree: answers.portraitAgree,
        suggested: result.suggestedFutureSelf,
        rewritten: result.rewrittenFutureSelf,
        canonical: result.futureSelf,
        source: result.futureSelfSource
      }
    });
  }

  const prompt = createPrompt(answers);
  const writes = await Promise.all([
    interactions.length ? supabase.from("interaction_history").insert(interactions) : Promise.resolve({ error: null }),
    tags.length ? supabase.from("student_tags").insert(tags.map(tag => ({ profile_id: profileId, tag_type: "discovery", tag }))) : Promise.resolve({ error: null }),
    supabase.from("pathway_recommendations").insert({
      profile_id: profileId,
      archetype: result.archetype,
      pathway_id: result.directions.featured,
      rationale: { interests: result.interestLabels, strengths: result.strengthLabels },
      generated_prompt: prompt
    }),
    supabase.from("discovery_results").insert({
      profile_id: profileId,
      payload: result.structuredData,
      character_brief: result.characterBrief,
      website_prompt: prompt
    })
  ]);
  const failed = writes.find(result => result && "error" in result && result.error);
  if (failed && "error" in failed && failed.error) {
    console.error("Không lưu được phần còn lại của hành trình", failed.error);
    return { cloud: false, reason: failed.error.message };
  }
  return { cloud: true, profileId };
}
