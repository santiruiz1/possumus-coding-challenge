import type { Trivia } from "../types/openTrivia";

export const shuffleAnswers = (trivia: Trivia) => {
  const answers = [...trivia.incorrect_answers, trivia.correct_answer];
  return [...answers].sort(() => Math.random() - 0.5);
};
