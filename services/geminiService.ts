import { GoogleGenAI, Modality } from "@google/genai";
import { GeneratedImage } from "../types";

const MAX_RETRIES = 2;

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const generateCouplePhotoshoot = async (
  maleImageFile: File,
  femaleImageFile: File,
  prompts: string[],
  aspectRatio: string,
): Promise<GeneratedImage[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  const maleImagePart = await fileToGenerativePart(maleImageFile);
  const femaleImagePart = await fileToGenerativePart(femaleImageFile);

  const generationPromises = prompts.map(async (prompt) => {
    // ABSOLUTELY CRITICAL: Face Identity Engineering
    const identityInstruction = `
      MANDATORY REQUIREMENT: ABSOLUTE FACIAL IDENTITY PRESERVATION.
      The generated image MUST feature the EXACT faces of the two people provided in the reference images.
      - Man's Face: 100% identical to the first reference image. Preserve exact eye shape, nose structure, jawline, and unique skin details.
      - Woman's Face: 100% identical to the second reference image. Preserve exact facial proportions, eyes, and unique features.
      - NO BEAUTIFICATION DRIFT: Do not stylize or "improve" the faces. They must be recognizable as the specific individuals provided.
      - SEAMLESS BLENDING: Integrate these exact identities into the following scene naturally.
    `;

    const fullPrompt = `${identityInstruction}
      
      SCENE DESCRIPTION: ${prompt}.
      
      TECHNICAL SPECS: Photorealistic, 8k resolution, cinematic lighting, shallow depth of field, professional photoshoot quality.
      ASPECT RATIO: ${aspectRatio}.`;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [
                        maleImagePart,
                        femaleImagePart,
                        { text: fullPrompt }
                    ],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
            if (part && part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                return { src: imageUrl, prompt: prompt };
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for: "${prompt.substring(0, 30)}..."`, error);
        }
    }
    return null;
  });

  const results = await Promise.all(generationPromises);
  return results.filter((result): result is GeneratedImage => result !== null);
};