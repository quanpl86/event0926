import { createClient } from "@supabase/supabase-js";
import type { JourneyAnswers, JourneyStep } from "@/types/journey";
import { createProfile, createPrompt, getTags } from "./profile";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export async function saveJourney(answers: JourneyAnswers, steps: JourneyStep[]) {
  if (!supabase || !answers.consent) return { cloud: false, reason: "local-only" as const };
  const profileId = crypto.randomUUID();
  const result = createProfile(answers);
  const tags = getTags(answers, steps);
  const { error: profileError } = await supabase.from("student_profiles").insert({
    id: profileId,
    display_name: answers.name,
    grade_band: answers.gradeBand,
    avatar_id: answers.avatar
  });
  if (profileError) return { cloud: false, reason: profileError.message };

  const interactions = Object.entries(answers.selections).map(([step_id, selected]) => ({
    profile_id: profileId,
    step_id,
    response: { selected }
  }));
  if (answers.projectName) interactions.push({ profile_id: profileId, step_id: "project", response: { selected: [answers.projectName] } });

  await Promise.all([
    interactions.length ? supabase.from("interaction_history").insert(interactions) : Promise.resolve(),
    tags.length ? supabase.from("student_tags").insert(tags.map(tag => ({ profile_id: profileId, tag_type: "discovery", tag }))) : Promise.resolve(),
    supabase.from("pathway_recommendations").insert({
      profile_id: profileId,
      archetype: result.archetype,
      pathway_id: result.pathway.title,
      rationale: { interests: result.interestLabels, strengths: result.strengthLabels },
      generated_prompt: createPrompt(answers)
    })
  ]);
  return { cloud: true, profileId };
}
