
import { GoogleGenAI, Modality } from "@google/genai";
import { GeneratedImage } from "../types";

const MAX_RETRIES = 3;

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
    const fullPrompt = `A photorealistic couple photoshoot. Theme: ${prompt}. Use the man's face from the first image provided and the woman's face from the second image provided. Faithfully reproduce the faces with 100% accuracy, ensuring natural skin tones and expressions. Blend the faces seamlessly onto the new bodies and scene. The final image should be in a ${aspectRatio} aspect ratio.`;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
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

            const part = response.candidates?.[0]?.content?.parts?.[0];
            if (part && part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                return { src: imageUrl, prompt: prompt };
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for prompt: "${prompt}"`, error);
            if (i === MAX_RETRIES - 1) {
                // Return null or throw to indicate failure after all retries
                return null;
            }
        }
    }
    return null; // Should not be reached if MAX_RETRIES > 0
  });

  const results = await Promise.all(generationPromises);
  return results.filter((result): result is GeneratedImage => result !== null);
};
