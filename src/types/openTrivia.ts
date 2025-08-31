export type RequestTriviaResponse = {
  response_code: number;
  results: Trivia[];
};

export type Trivia = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffledAnswers?: string[];
};

export type RequestCategoriesResponse = {
  trivia_categories: { name: string; id: number }[];
};

export type RequestTokenResponse = {
  response_code: number;
  response_message: string;
  token: string;
};
