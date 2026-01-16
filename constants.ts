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
    description: "High-end editorial fashion in a controlled studio environment.",
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
    description: "Timeless monochrome elegance focusing on emotion and light.",
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
    name: "Foreign Trip: Japan",
    description: "A romantic journey through the iconic sights and culture of Japan.",
    prompts: [
      "A romantic couple posing directly in front of the iconic red Tokyo Tower on a clear day. Modern chic travel outfits.",
      "A cozy photo of the couple sitting inside a warm, wooden Japanese cafe in Kyoto, drinking matcha lattes. Soft interior lighting.",
      "The couple enjoying an authentic sushi dinner at a high-end sushi counter in Ginza. The man holding a piece of nigiri with chopsticks for the woman.",
      "Couple wearing beautiful traditional silk Kimonos walking through the orange Torii gates of Fushimi Inari Shrine.",
      "A breathtaking wedding photoshoot. The couple in traditional Japanese wedding attire (Shiromuku and Montsuki) standing serenely in front of a Shinto Shrine.",
      "A majestic shot of the couple standing by Lake Kawaguchiko with the snow-capped Mount Fuji clearly visible in the background. Cherry blossoms framing the shot.",
      "A candid shot of the couple laughing while sitting on the tatami mats of a traditional Japanese Ryokan house, wearing Yukatas.",
      "The couple standing in the middle of the famous Shibuya Crossing in Tokyo, surrounded by the blur of the crowd and neon signs at night.",
      "A peaceful stroll through the Arashiyama Bamboo Grove in Kyoto. The sunlight filtering through the tall bamboo stalks onto the couple."
    ],
  },
  {
    id: 4,
    name: "Foreign Trip: Paris",
    description: "The city of love. Monuments, cafes, and Parisian chic.",
    prompts: [
      "A classic romantic shot of the couple standing on the Trocadéro plaza with the Eiffel Tower towering in the background. Golden hour lighting.",
      "The couple sitting at a small round table at a sidewalk cafe in Montmartre, eating croissants and drinking coffee. Vintage Parisian vibe.",
      "A stylish photo of the couple posing in front of the glass pyramid at the Louvre Museum at twilight.",
      "Walking hand-in-hand along the Seine river banks with the historic bridges and architecture in the background.",
      "A grand shot of the couple standing in front of the Arc de Triomphe on the Champs-Élysées. Fashionable coats and scarves.",
      "The couple sharing a macaron at a luxury patisserie shop window. Pastel colors and elegant decor.",
      "A romantic kiss on the Pont des Arts bridge (Love Lock bridge) with the river view behind them.",
      "Couple walking through the manicured gardens of the Palace of Versailles. Royal and opulent atmosphere.",
      "Night shot of the couple walking down a cobblestone street in Le Marais, illuminated by warm street lamps and restaurant glows."
    ],
  },
  {
    id: 5,
    name: "Dance Styles of the World",
    description: "Dynamic poses showcasing 9 different popular dance styles.",
    prompts: [
      "The couple performing a graceful Ballet lift on a stage with a spotlight. The woman in a tutu, the man in tights.",
      "A passionate Salsa dance moment in a dimly lit Havana-style club. Vibrant red dress and flowing motion.",
      "A colorful Bollywood dance number. The couple in vibrant Indian costumes posing dynamically with a large group of dancers blurred in the background.",
      "A cool Street Breakdance battle pose. The couple in urban streetwear, one doing a freeze pose, graffiti wall background.",
      "A dramatic Tango dip in an elegant ballroom. The woman in a high-slit black dress, the man in a sharp suit. Rose in mouth.",
      "A classic Waltz in a grand palace hall with chandeliers. Sweeping ballgown and tuxedo.",
      "A lively Swing dance throw. Vintage 1950s outfits, polka dots and suspenders. Energetic and fun.",
      "A fiery Flamenco pose in a Spanish courtyard. The woman in a ruffled dress clapping, the man playing a guitar nearby.",
      "A contemporary interpretive dance pose. Neutral earth-tone clothing, emotional expression, minimalist concrete background."
    ],
  },
  {
    id: 6,
    name: "Sports & Athletics",
    description: "Active couple moments in gym, stadium, and court settings.",
    prompts: [
      "Couple at a modern gym, doing a partner workout. Matching high-end sportswear, gym equipment in background.",
      "Action shot on a Badminton court. The couple in sportswear, rackets in hand, ready to serve. Bright stadium lighting.",
      "Playful sparring in a Boxing ring. Wearing boxing gloves and shorts. Sweaty and intense but smiling.",
      "Couple in white Judo Gis on a tatami mat, bowing to each other respectfully before a match.",
      "Athletes running together on a professional red running track in a stadium. Dynamic motion blur background.",
      "Couple high-fiving on a Tennis court after a match. wearing white tennis skirts and polos. Sun flare.",
      "Swimming pool shot. The couple at the edge of an olympic pool, wearing swim caps and goggles, looking at the camera.",
      "Basketball court lifestyle shot. The couple playing 1-on-1 on an urban outdoor court at sunset.",
      "Cycling couple taking a break on a scenic mountain road. Wearing helmets and professional cycling jerseys with bikes."
    ],
  },
  {
    id: 7,
    name: "World Culture Costumes",
    description: "Traditional attire from 9 different cultures with iconic landmarks.",
    prompts: [
      "Couple wearing colorful traditional Mexican Mariachi and Folklorico dresses, standing in front of a colorful colonial building in Guanajuato.",
      "Couple in exquisite Indian traditional wear (Saree and Sherwani) posing in front of the Taj Mahal at sunrise.",
      "Couple in traditional Japanese Kimonos standing on a red bridge in a Japanese garden.",
      "Couple in traditional Scottish Kilts and Highland dress, standing in front of a misty Scottish castle.",
      "Couple in Ancient Egyptian stylized costumes standing before the Great Sphinx of Giza. Desert sands background.",
      "Couple in traditional Spanish Matador and Flamenco attire standing in the Plaza de España in Seville.",
      "Couple in traditional Chinese Hanfu robes standing on the Great Wall of China. Majestic mountain view.",
      "Couple in traditional American Western Cowboy/Cowgirl attire with hats and boots, standing in Monument Valley.",
      "Couple in elaborate Venetian Carnival costumes and masks, posing in a gondola on the canals of Venice, Italy."
    ],
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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