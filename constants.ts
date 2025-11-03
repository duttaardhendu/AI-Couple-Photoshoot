
import { Theme } from './types';

export const ASPECT_RATIOS: string[] = [
  "1:1",
  "9:16",
  "16:9",
  "3:2",
  "4:5",
  "21:9",
];

export const THEMES: Theme[] = [
  {
    id: 1,
    name: "Studio Fashion Shoot",
    description: "Couple posing in a high-end fashion studio with soft lighting and cinematic backdrops.",
    prompts: [
      "A high-end fashion studio photoshoot of a couple, man in a tailored dark suit, woman in an elegant evening gown, against a charcoal gray seamless backdrop with soft, diffused key lighting.",
      "A Vogue-inspired couple's portrait in a studio. Man seated on a designer chair, woman standing behind him with a hand on his shoulder. Dramatic, moody lighting.",
      "A minimalist, clean studio look. Couple in matching white linen outfits, posing playfully against a pure white background. Bright, high-key lighting.",
      "Cinematic studio portrait of a couple in an intimate embrace. Warm, golden hour style lighting creating a romantic mood. Shallow depth of field.",
      "A black and white studio fashion shot. Couple in classic, timeless outfits. High contrast lighting with deep shadows. A powerful, confident pose.",
      "Couple in a studio with a floral installation background. Soft, romantic lighting. Woman wears a flowing floral dress, man in a light-colored suit.",
      "Edgy, modern studio photoshoot with neon light accents. Couple in stylish, contemporary clothing. Dynamic, energetic poses.",
      "A relaxed, casual studio portrait. Couple sitting on the floor, laughing. Natural window light simulation. Cozy, intimate atmosphere.",
      "An artistic studio portrait with fabric draping in the background. Couple in a graceful, almost dance-like pose. Soft, ethereal lighting."
    ],
  },
  {
    id: 2,
    name: "Classic Black & White",
    description: "Man seated elegantly, woman standing behind, both in monochrome attire, studio light gradient.",
    prompts: [
      "Classic black and white portrait of a couple in a studio. Man seated, woman standing behind him with hands on his shoulders. Single light source, creating a strong gradient.",
      "A timeless black and white photo. Couple facing each other, foreheads touching. Soft, romantic lighting. Elegant formal wear.",
      "Film noir style black and white portrait of a couple. High contrast, dramatic shadows. Man in a suit and fedora, woman in a vintage dress.",
      "A gentle, low-key black and white portrait. Couple in a close embrace, looking at the camera. Soft fill light to illuminate their faces.",
      "A candid, laughing moment captured in black and white. Couple in casual attire, against a simple studio backdrop. Bright, even lighting.",
      "An elegant black and white full-body shot. Couple standing side-by-side, holding hands. Classic studio lighting setup.",
      "A close-up black and white shot focusing on the couple's expressions. Intense, emotional connection. Simple, dark background.",
      "A high-key black and white portrait. Couple in white outfits against a white background. Creates a dreamy, ethereal feel.",
      "A grainy, film-like black and white photo of a couple. Captures a nostalgic, vintage mood. Subtle, natural lighting."
    ],
  },
  {
    id: 3,
    name: "Beach Romance",
    description: "Couple at sunset beach, waves in background, barefoot, wearing pastel summer outfits.",
    prompts: [
      "A romantic photo of a couple walking hand-in-hand on a beach at sunset. The sky is painted with orange and pink hues. They are barefoot, wearing light summer clothes.",
      "A couple sitting on a blanket on a sandy beach, sharing a laugh. A picnic basket beside them. Gentle waves in the background.",
      "A playful photo of a couple splashing in the shallow water of a tropical beach. Bright daylight, clear blue water.",
      "A silhouette of a couple kissing on the beach against a vibrant sunset. The sun is just touching the horizon.",
      "A close-up photo of a couple's faces, noses touching, with the serene beach and ocean blurred in the background.",
      "A couple walking away from the camera along the shoreline, leaving footprints in the sand. Soft, late afternoon light.",
      "A man lifting a woman in his arms on the beach, both laughing joyfully. Clear sunny day.",
      "A serene photo of a couple sitting on a driftwood log, looking out at the ocean. Calm, peaceful atmosphere.",
      "A drone-shot style photo of a couple lying on the sand, holding hands, with waves gently washing ashore near them."
    ],
  },
  {
    id: 4,
    name: "Traditional Indian Wedding",
    description: "Bride and groom in royal Indian attire, temple or palace background, soft bokeh lighting.",
    prompts: [
      "A stunning portrait of an Indian bride and groom in traditional royal wedding attire. The groom wears a sherwani and the bride a heavy lehenga. Background of a grand palace with soft bokeh lights.",
      "An Indian wedding couple during the varmala (garland exchange) ceremony. Joyful expressions, surrounded by flowers. Warm, festive lighting.",
      "A candid shot of an Indian wedding couple sharing a quiet moment amidst the celebrations. Soft, ambient lighting, beautiful decorations in the background.",
      "An Indian couple posing in front of an ancient temple. Rich, vibrant colors in their outfits and the surroundings.",
      "A close-up of an Indian bride and groom, capturing the intricate details of their attire and jewelry. Soft, flattering light.",
      "A photo of an Indian couple during the sangeet ceremony, dancing together. Dynamic, colorful lighting.",
      "A royal portrait of an Indian couple seated on a throne-like sofa. Regal and elegant atmosphere. Palace interior background.",
      "An Indian couple walking hand-in-hand through a beautifully decorated corridor of a heritage hotel.",
      "A photo capturing the emotional moment of an Indian bride's vidaai, with the groom reassuringly by her side."
    ]
  },
  {
    id: 5,
    name: "Rainy Street Hug",
    description: "Couple under one umbrella on a rainy evening street, reflections on wet pavement, neon glow.",
    prompts: [
      "A romantic photo of a couple hugging under a single black umbrella on a rainy city street at night. Neon signs from shops cast colorful reflections on the wet pavement.",
      "A couple sharing a kiss under a transparent umbrella, with raindrops visible on it. Soft glow from streetlights.",
      "A cinematic shot of a couple walking down a cobblestone street in the rain. Warm light from cafes and shops.",
      "A black and white photo of a couple under an umbrella, capturing a timeless, romantic moment in the rain.",
      "A couple laughing as they run through the rain, holding an umbrella. Playful, spontaneous moment.",
      "A reflection of a couple kissing in a puddle on a rainy street. Unique, artistic perspective.",
      "A wide shot of a couple standing under an umbrella in a vast, empty city square at night in the rain.",
      "A close-up of a couple's faces under an umbrella, with rain falling around them. Intimate and cozy mood.",
      "A couple hailing a taxi in the rain, huddled together under an umbrella. Classic city romance scene."
    ]
  }
];
