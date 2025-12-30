import React from 'react';

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface PromptElement {
  id: string;
  label: string;
  promptFragment: string;
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
