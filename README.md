# Critiqe Studio 📸✨

Critiqe Studio is a premium AI-powered creative suite designed to transform photos and generate social media visuals using Google's Gemini models. It serves as your personal photo stylist, image enhancer, and content creation assistant.

## Features

### 1. AI Photo Stylist 🎨
Upload a photo and transform it using professional styles or custom prompts (Image-to-Image):
- **Professional Headshots**: Generate Corporate, Studio, and Outdoor looks.
- **Creative Styles**: Transform photos into Anime, Superhero comics, Pop Art, or Vintage styles.
- **Privacy Focused**: Images are processed via API and are not permanently stored by the application.

### 2. Photo Enhancer 🪄
Restore and upgrade your images:
- **Auto Enhance**: Fix blur, improve lighting, and upscale resolution to 4K while preserving facial identity.
- **Custom Tweaks**: Use natural language to make specific edits (e.g., "Make the background blue", "Fix red eyes").

### 3. Social Media Creator 📱
Generate optimized visuals based on your post content (Text-to-Image):
- **Platform Optimization**: Select ratios for LinkedIn (16:9), Instagram Post (1:1), Stories/TikTok (9:16).
- **Intelligent Prompting**: Paste your post text, and the AI analyzes it to suggest a detailed visual prompt.
- **Mood Selection**: Choose the vibe of your image (Professional, Humorous, Abstract, Cinematic, etc.).

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
  - *Gemini 2.5 Flash Image* (Generation)
  - *Gemini 3 Flash Preview* (Prompt Engineering & Text Logic)
- **Utilities**: `heic2any` for HEIC image support.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A Google Cloud Project or AI Studio account with the Gemini API enabled.
- An API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/critiqe-studio.git
   cd critiqe-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a file named `.env` in the root directory.
   - Add your API key:
   ```env
   API_KEY=your_actual_api_key_here
   ```
   > **⚠️ Important:** The `.env` file is ignored by Git to protect your API key.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. **Upload**: Drag and drop your reference photos into the top bar.
2. **Select Tool**: Choose between Photo Stylist, Enhancer, or Social Media Creator.
3. **Generate**: Select your desired style or input a prompt, and let the AI create stunning visuals in seconds.

## License

MIT