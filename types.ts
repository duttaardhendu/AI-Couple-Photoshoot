
export interface Theme {
  id: number;
  name: string;
  description: string;
  prompts: string[];
}

export interface GeneratedImage {
  src: string;
  prompt: string;
}
