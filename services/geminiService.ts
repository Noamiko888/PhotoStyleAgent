import { GoogleGenAI, Modality, Type } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';
import { AspectRatio } from "../types";

const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';
const TEXT_MODEL_NAME = 'gemini-3-flash-preview';

export async function generateImage(
  prompt: string, 
  imageSource?: File | File[] | string | string[] | null,
  aspectRatio: AspectRatio = '1:1'
): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const parts: any[] = [];
  let isMultipleImages = false;

  // Handle image sources (single or array)
  if (imageSource) {
    const sources = Array.isArray(imageSource) ? imageSource : [imageSource];
    if (sources.length > 1) {
        isMultipleImages = true;
    }

    for (const src of sources) {
        let base64Data: string;
        let mimeType: string;

        if (src instanceof File) {
            base64Data = await fileToBase64(src);
            mimeType = src.type;
        } else { // Handle base64 data URL string
            const match = src.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
            if (!match || match.length < 3) {
                console.warn("Skipping invalid image source format.");
                continue;
            }
            mimeType = match[1];
            base64Data = match[2];
        }

        parts.push({
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        });
    }
  }

  // Construct final prompt text
  let finalPrompt = prompt;
  if (isMultipleImages) {
    finalPrompt = `Using the attached reference photos of the same person to understand their facial features and likeness, ${prompt}`;
  } else if (imageSource) {
    finalPrompt = `Using the attached reference photo, ${prompt}`;
  }

  // Add Text Part
  parts.push({
    text: finalPrompt,
  });

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL_NAME,
    contents: {
      parts: parts,
    },
    config: {
      responseModalities: [Modality.IMAGE],
      imageConfig: {
        aspectRatio: aspectRatio
      }
    },
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image was generated. The model might have refused the request due to safety policies or an invalid prompt.");
}

export async function refinePrompt(userInput: string, platform: string, mood?: string, hasImages?: boolean): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const moodInstruction = mood ? `The user specifically wants the image to have a "${mood}" style or mood.` : '';
  const imageInstruction = hasImages 
    ? "The user has attached reference photo(s). Your prompt should describe how to transform or style these specific photo(s) to match the social media post context. Do NOT describe a completely new person; the subject is the person in the attached photo(s)." 
    : "No reference photos provided. Create a prompt for a completely new image from scratch.";

  const prompt = `
    You are an expert visual prompt engineer for generative AI. 
    The user has provided a social media post or a topic intended for ${platform}.
    ${moodInstruction}
    ${imageInstruction}
    
    Your task is to create a detailed, high-quality image generation prompt that captures the essence, mood, and subject matter of this text.
    The image prompt should be optimized for a ${platform} audience (e.g., professional and clean for LinkedIn, aesthetic and vibrant for Instagram).
    
    Do NOT generate the image yourself. Only return the text prompt describing the image.
    Describe lighting, composition, style, and key elements.
    
    User Input: "${userInput}"
    
    Return ONLY the prompt text.
  `;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: 'text/plain'
    }
  });

  return response.text || "Could not generate prompt.";
}