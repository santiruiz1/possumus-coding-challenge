import type { Trivia } from "../types/openTrivia";

export const shuffleAnswers = (trivia: Trivia) => {
  const answers = [...trivia.incorrect_answers, trivia.correct_answer];
  return [...answers].sort(() => Math.random() - 0.5);
};

export const triviaDifficulty = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export type SelectCategory = {
  value: string
  label: string
}
