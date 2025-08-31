import axios from "axios";
import type {
  RequestCategoriesResponse,
  RequestTriviaResponse,
  Trivia,
} from "../types/openTrivia";
import { decodeHtmlEntities } from "../application/utils";

export const getTrivias = async ({
  difficulty,
  category,
}: {
  difficulty: string | null;
  category: number | null;
}): Promise<RequestTriviaResponse> => {
  const url = "https://opentdb.com/api.php";
  const response = await axios.get(url, {
    params: {
      amount: 5,
      type: "multiple",
      difficulty,
      category,
    },
  });
  response.data.results.forEach((trivia: Trivia) => {
    trivia.question = decodeHtmlEntities(trivia.question);
    trivia.correct_answer = decodeHtmlEntities(trivia.correct_answer);
    trivia.incorrect_answers = trivia.incorrect_answers.map((answer) =>
      decodeHtmlEntities(answer)
    );
  });
  return response.data;
};

export const getCategories = async (): Promise<RequestCategoriesResponse> => {
  const url = "https://opentdb.com/api_category.php";
  const response = await axios.get(url);
  return response.data;
};
