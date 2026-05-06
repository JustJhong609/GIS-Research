export type Category =
  | 'environment' | 'urban' | 'disaster' | 'agriculture'
  | 'social' | 'water' | 'health' | 'remote';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Dataset {
  name: string;
  url: string;
  description?: string;
}

export interface Plugin {
  name: string;
  installSteps: string[];
  menuPath?: string;
}

export interface CommonError {
  error: string;
  cause: string;
  fix: string;
}

export interface GISTopicFull {
  id: number;
  cat: Category;
  icon: string;
  color: string;
  title: string;
  desc: string;
  tags: string[];
  difficulty: Difficulty;
  estimatedTime: string;
  tools: string[];
  steps: string[];
  datasets: Dataset[];
  plugins: Plugin[];
  commonErrors: CommonError[];
}
