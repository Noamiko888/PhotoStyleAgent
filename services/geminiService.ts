import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';

const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';

export async function generateImage(prompt: string, imageSource: File | string): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let base64Data: string;
  let mimeType: string;

  if (imageSource instanceof File) {
    base64Data = await fileToBase64(imageSource);
    mimeType = imageSource.type;
  } else { // Handle base64 data URL string for follow-ups
    const match = imageSource.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
    if (!match || match.length < 3) {
      throw new Error("Invalid image data URL format for follow-up generation.");
    }
    mimeType = match[1];
    base64Data = match[2];
  }

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL_NAME,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image was generated. The model might have refused the request due to safety policies or an invalid prompt.");
}