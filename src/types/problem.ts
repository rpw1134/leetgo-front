export type ProblemGenerationRequest = {
  creator_email: string;
  user_prompt: string;
  language: string;
  model_provider: string;
  model_name: string;
  problem_type?: string;
  difficulty?: string;
};

export type TestCase = {
  id: number;
  test_case_input: string;
  test_case_output: string;
  problem_id: number;
};

export type ProblemConstraint = {
  id: number;
  constraint: string;
  problem_id: number;
};

export type ProblemResponse = {
  id: number;
  title: string;
  description: string;
  data: string | null;
  creator_email: string;
  creator_username: string;
  creator_id: number;
  generalized_function_signature: string;
  test_cases: TestCase[];
  problem_constraints: ProblemConstraint[];
};

export type ProblemGenerationChunk = {
  content?: string;
  complete_problem?: ProblemResponse;
  is_final: boolean;
};
