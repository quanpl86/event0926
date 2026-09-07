export const FIGURINE = {
  style: "3D Pixar style, cute chibi collectible figurine, art toy",
  proportion: "chubby proportions, oversized head, big expressive glossy eyes, full-body standing pose",
  material: "glossy painted vinyl toy finish, smooth matte PVC resin",
  base: "standing on a sleek round collector display pedestal / acrylic base",
  light: "studio lighting, soft depth of field, high quality 3D toy render, product photography of a figurine"
};

const FORBID = [
  "2D flat illustration",
  "geometric shape collage",
  "paper cutout",
  "SVG or icon style",
  "vector blobs glued together",
  "clipart",
  "sticker collage",
  "low-poly abstract mascot",
  "photorealistic human face",
  "real child photo"
].join(", ");

export function figurineLook(ageLine: string) {
  return {
    format: `${FIGURINE.style}; ${FIGURINE.proportion}; ${ageLine}; ${FIGURINE.material}`,
    background: FIGURINE.base + ", clean bright studio backdrop",
    forbid: FORBID
  };
}

export function buildFigurinePrompt(input: {
  identity: string;
  appearance: string;
  expression: string;
  style: string;
  palette: string;
  gear: string;
}) {
  return [
    FIGURINE.style,
    `of ${input.identity}`,
    input.appearance,
    input.expression,
    FIGURINE.proportion,
    input.style,
    `color palette ${input.palette}`,
    `signature accessory: ${input.gear}`,
    FIGURINE.material,
    FIGURINE.base,
    FIGURINE.light,
    "single character, consistent design for reuse on a website hero and profile cards",
    "NOT a real person, NOT 2D shapes"
  ].join(", ");
}
