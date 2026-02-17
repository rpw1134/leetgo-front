export type ProblemGenerationRequest = {
  creator_email: string;
  user_prompt: string;
  language: string;
  model_provider: string;
  model_name: string;
  problem_type?: string;
  difficulty?: string;
};

export type ProblemResponse = {
  // This is a placeholder. You should update it with the actual response structure from your DTO.
  id: string;
  title: string;
  description: string;
  solution: string;
  language: string;
};

export type ProblemGenerationChunk = {
  content?: string;
  complete_problem?: ProblemResponse;
  is_final: boolean;
};
