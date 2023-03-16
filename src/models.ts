export interface Tool {
  toolName: string;
  toolIcon: string;
}

export interface Project {
  name: string;
  tools: Tool[];
  description: string;
  githubLink: string;
  productionLink: string;
}
