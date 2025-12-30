import { StylePreset, PromptElement } from './types';
import { CameraIcon } from './components/icons/CameraIcon';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { LeafIcon } from './components/icons/LeafIcon';
import { CircleHalfIcon } from './components/icons/CircleHalfIcon';
import { CoffeeIcon } from './components/icons/CoffeeIcon';
import { LightbulbIcon } from './components/icons/LightbulbIcon';
import { AnimeIcon } from './components/icons/AnimeIcon';
import { SuperheroIcon } from './components/icons/SuperheroIcon';
import { PopArtIcon } from './components/icons/PopArtIcon';
import { StarIcon } from './components/icons/StarIcon';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'special-mode',
    name: 'Special Mode',
    description: 'A polished, half-body portrait for a special photo.',
    promptTemplate: "Create a polished portrait of the person, half body shot, that makes a special photo.",
    icon: StarIcon,
  },
  {
    id: 'studio-headshot',
    name: 'Studio Headshot',
    description: 'High-end studio look with soft lighting and neutral backdrop.',
    promptTemplate: "Create a professional, high-end studio headshot of the person. Isolate the subject and place them against a clean, hand-painted canvas background (neutral light grey or soft beige). Use soft, diffuse studio lighting (Rembrandt or butterfly lighting setup) to accentuate facial features gently. Ensure sharp focus on the eyes, natural skin texture, and a shallow depth of field (bokeh) to separate the subject from the background. 8k resolution, photorealistic.",
    icon: CameraIcon,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Confident, modern business look with architectural depth.',
    promptTemplate: "Generate a premium corporate portrait. Place the subject in a modern, high-tech office environment with depth. The background should be a blurred (bokeh) open-plan office with glass architectural elements and natural daylight. The subject should be dressed in professional business attire, looking confident and approachable. Use 'golden hour' natural lighting mixed with soft fill light. Composition should follow the rule of thirds. Photorealistic, 85mm lens style.",
    icon: BriefcaseIcon,
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    description: 'Natural, approachable look with soft sunlight.',
    promptTemplate: "Create a lifestyle portrait in a beautiful outdoor setting. Place the subject in a soft-focus park or urban garden environment. Use natural, soft sunlight (golden hour) backlighting to create a rim light effect on the hair. The background should be lush greenery or blurred city texture, creating a friendly and approachable vibe. The image should look like it was taken with a high-aperture portrait lens (f/1.8). High resolution, natural colors.",
    icon: LeafIcon,
  },
  {
    id: 'black-and-white',
    name: 'Black & White',
    description: 'A timeless and dramatic high-contrast monochrome portrait.',
    promptTemplate: "Convert the person in the uploaded photo into a classic, high-contrast black and white portrait. Completely remove the original background and replace it with a simple, dark, or textured gray background. The lighting should be dramatic and cinematic, emphasizing the subject's facial contours. The final image should be a powerful, timeless monochrome headshot. Maintain the subject's likeness.",
    icon: CircleHalfIcon,
  },
  {
    id: 'approachable',
    name: 'Approachable',
    description: 'A warm, inviting photo with soft lighting and a cozy background.',
    promptTemplate: "Take the subject from the uploaded photo and place them in a warm, inviting setting like a cozy cafe or a comfortable indoor space with soft lighting. The background should be tastefully blurred. Apply warm color tones to the entire image to create an approachable and friendly vibe. Ensure the subject's face is clearly visible and their original features are maintained.",
    icon: CoffeeIcon,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold, modern look with a vibrant, eye-catching background.',
    promptTemplate: "Isolate the subject from the uploaded photo, remove the background, and place them against a vibrant, solid color or a simple, abstract graphic background. The lighting should be clean and bright, making the subject pop. This style is for creative professionals who want a bold, modern, and eye-catching profile picture. Preserve the subject's identity perfectly.",
    icon: LightbulbIcon,
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Reimagine yourself in a vibrant Japanese anime style.',
    promptTemplate: "Transform the person from the uploaded photo into an anime/manga art style. Completely remove the original background and replace it with a dynamic, stylized anime background with speed lines or a soft-focus scenic view. The character should have characteristic features like large expressive eyes and stylized hair, while still retaining a recognizable likeness to the original person.",
    icon: AnimeIcon,
  },
  {
    id: 'superhero',
    name: 'Superhero',
    description: 'Become a hero with a comic book art transformation.',
    promptTemplate: "Reimagine the person in the photo as a superhero in a modern comic book art style. Completely remove the original background and replace it with a dramatic, action-filled scene, like a cityscape at night or an explosion. The lighting should be heroic and dynamic. Keep the facial likeness of the person but render their clothing and pose in a superhero style.",
    icon: SuperheroIcon,
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'A bold, graphic style inspired by Andy Warhol.',
    promptTemplate: "Convert the photo of the person into a Pop Art style portrait, inspired by Andy Warhol. Isolate the subject, remove the background, and place them on a flat, vibrant, solid-color background. The image should use a limited, high-contrast color palette and posterization effects. Create a bold, graphic, and visually striking image.",
    icon: PopArtIcon,
  },
];

export const PROMPT_ELEMENTS: PromptElement[] = [
  {
    id: 'maintain-likeness',
    label: 'Maintain Likeness',
    promptFragment: 'Ensure the facial features and likeness of the person in the photo are accurately maintained.',
  },
  {
    id: 'polish-face',
    label: 'Polish Facial Look',
    promptFragment: 'Subtly enhance the facial features, smooth the skin, and give a polished, professional look.',
  },
  {
    id: 'improve-lighting',
    label: 'Improve Lighting',
    promptFragment: 'Adjust the lighting to be more cinematic and flattering, adding depth and dimension.',
  },
  {
    id: 'vibrant-colors',
    label: 'Vibrant Colors',
    promptFragment: 'Boost the color saturation and vibrancy for a more dynamic and eye-catching image.',
  },
  {
    id: 'photo-realistic',
    label: 'Photo-Realistic',
    promptFragment: 'Generate the final image with a high degree of photorealism, focusing on realistic textures and details.',
  },
  {
    id: 'formal-attire',
    label: 'Formal Attire',
    promptFragment: 'Change the clothing to formal business attire, such as a suit or blazer.',
  },
  {
    id: 'casual-wear',
    label: 'Casual Wear',
    promptFragment: 'Change the clothing to casual wear, like a t-shirt or sweater.',
  },
  {
    id: 'dramatic-mood',
    label: 'Dramatic Mood',
    promptFragment: 'Create a dramatic and moody atmosphere with high-contrast lighting and deep shadows.',
  },
  {
    id: 'soft-focus',
    label: 'Soft Focus BG',
    promptFragment: 'Apply a soft-focus effect to the background for a dreamy, artistic look.',
  },
  {
    id: 'detailed-background',
    label: 'Detailed BG',
    promptFragment: 'Add more intricate and interesting details to the background environment.',
  },
  {
    id: 'vintage-look',
    label: 'Vintage Look',
    promptFragment: 'Give the image a vintage or retro film look with specific color grading and grain.',
  },
  {
    id: 'smile',
    label: 'Add a Smile',
    promptFragment: 'Subtly enhance the expression to create a gentle, confident smile.',
  },
  {
    id: 'adapt-clothing',
    label: 'Adapt Clothing',
    promptFragment: "Intelligently modify the subject's clothing to perfectly match the theme and environment of the selected style.",
  },
  {
    id: 'full-body',
    label: 'Full Body Shot',
    promptFragment: 'Reframe the image as a full-body photograph, capturing the person from head to toe within the scene.',
  }
];


export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
export const MAX_FILE_SIZE_MB = 20;