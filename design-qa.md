# Design QA — Future Creator Journey

## Evidence

- Source visual truth:
  - `/var/folders/vb/kb6nt89j7zqc5dbxjn8p7pg40000gn/T/TemporaryItems/NSIRD_screencaptureui_OSmQEi/Screenshot 2026-09-06 at 23.02.37.png`
  - `/var/folders/vb/kb6nt89j7zqc5dbxjn8p7pg40000gn/T/TemporaryItems/NSIRD_screencaptureui_GTO7jg/Screenshot 2026-09-06 at 23.02.47.png`
  - `/var/folders/vb/kb6nt89j7zqc5dbxjn8p7pg40000gn/T/TemporaryItems/NSIRD_screencaptureui_HFsfS3/Screenshot 2026-09-06 at 23.02.56.png`
  - `/var/folders/vb/kb6nt89j7zqc5dbxjn8p7pg40000gn/T/codex-clipboard-e1653ddb-1e1d-4292-a003-ce578119b43a.png`
  - Six supplied TEKY activity images under `/var/folders/vb/kb6nt89j7zqc5dbxjn8p7pg40000gn/T/` and their preserved copies in `public/assets/`.
- Implementation: `http://localhost:3000/`
- Implementation screenshot evidence: Codex in-app Browser captures of the landing page, selected-interest state, Creator Profile state, and final Website Preview state. The browser tool returned the captures inline and did not expose a filesystem path.
- Viewport: approximately 977 × 1151 CSS px, device scale factor 1.
- Source dimensions: TEKY activity images 1200 × 1200 px; reference landing desktop 2048 × 1168 px; logo 500 × 250 px.
- State: landing, identity input, every journey step, selected cards, parent handoff, parent observation, parent support, family mirror, self-designed character, profile, project showcase, roadmap, Google AI Studio handoff, refinement guidance, sharing guidance, and local-save success.

## Full-view comparison evidence

- The reference system uses a light neutral canvas, spacious centered hierarchy, dark navy display copy, mint/green primary actions, thin neutral borders, rounded white cards, and restrained shadows. The implementation preserves this hierarchy and density while adapting it to a discovery journey rather than an assessment landing page.
- The supplied activity artwork uses TEKY teal, warm yellow, white/mint backgrounds, rounded image frames, and bold Vietnamese display copy. The implementation uses the actual supplied assets, shifts the UI token system to TEKY teal, and reserves yellow for highlights and calls to action.
- Layout remains airy at the captured tablet/desktop width. Core actions remain above the fold on journey screens and are not obscured by overflow.

## Focused region comparison evidence

- Header and logo: the supplied transparent TEKY mark is used directly, with its original aspect ratio preserved and no recreated mark.
- Choice cards: icon sizing, mint icon wells, thin borders, selected check state, radius, and text hierarchy match the reference card language.
- Creator Profile and Website Preview: large navy headings, teal identity accent, white card shell, restrained secondary labels, and project cards match the reference visual system without introducing numeric scoring.
- Workshop timeline: six checkpoints map the complete 60-minute facilitation plan (8' → 14' → 5' → 17' → 9' → 7'). Participant UI shows approximate stage duration rather than a countdown timer.
- Activity guide: all six supplied 1:1 images use `object-cover` at their natural square ratio, with no stretching, placeholder imagery, or synthetic replacement.

## Required fidelity surfaces

- Fonts and typography: Be Vietnam Pro is bundled locally at weights 400–800. Headings use heavy optical weight, tight tracking, and compact line height; small labels use uppercase tracking. Vietnamese diacritics render correctly.
- Spacing and layout rhythm: 12–28 px component spacing, 24–28 px panel radii, thin borders, and low-opacity elevation match the source. Responsive layouts collapse side rails before they can crowd the main task.
- Colors and visual tokens: page `#f8faf9`, ink `#111827`, TEKY teal scale centered on `#18af99`, deep teal `#006d63`, yellow `#ffd044`, and neutral border `#e5ebe7` reproduce the supplied palette with sufficient contrast.
- Image quality and asset fidelity: the source TEKY logo and six activity images are used as real PNG assets. Their crops and aspect ratios were verified in the browser; no logo or activity image was approximated with code.
- Copy and content: language consistently frames the experience as exploration, avoids test/score language, separates child and parent input, and includes the supplied guidance that interests are signals rather than career conclusions.

## Findings

- No actionable P0, P1, or P2 visual mismatches remain in the verified viewport and states.

## Primary interactions tested

- Start journey.
- Enter child display name and select grade band.
- Select multiple interests and bag items.
- Select a single creation style, problem strategy, and impact area.
- Name a future project.
- Complete the child-to-parent handoff.
- Select parent observations with a maximum of three.
- Select up to two concrete parent-support actions.
- Enter a real parent observation and choose one shared family action.
- Confirm 2–4 inferred traits and switch between Future Buddy suggestion and child-designed character modes.
- Verify that portrait style, palette, future identity, and signature gear are derived from earlier interest/project/impact selections.
- View the four project recommendations, three exploration directions, three-stage roadmap, full website prompt, six-stage workshop timeline, Version 2 editing prompts, and family sharing prompts.
- Complete without cloud consent and confirm local-save success.

## Console and runtime checks

- Next.js production build completed successfully.
- TypeScript strict typecheck completed successfully.
- No runtime error state or Next.js error overlay appeared during the complete browser journey.
- Google AI Studio link resolves to `https://aistudio.google.com/app/apps` and opens in a new tab; QA did not transmit or paste child data to the external service.
- Cloud persistence was intentionally not submitted during QA because it would transmit a child's sample profile to the connected Supabase project. The local-only fallback was verified.

## Comparison history

1. Initial build: external Google font fetch caused an offline production-build failure. Fixed by bundling Be Vietnam Pro locally through `@fontsource/be-vietnam-pro`.
2. Initial timing pass: journey total displayed 59 minutes. Fixed identity phase from 4 to 5 minutes; final total is now 60 minutes.
3. Post-fix browser pass: all journey states rendered correctly, selected states were visible, and final local-save success was confirmed.

## Follow-up polish

- P3: add a dedicated small-phone browser capture when a 390 px in-app viewport control is available. CSS breakpoints and touch target sizing are already implemented.

## Final result

final result: passed
