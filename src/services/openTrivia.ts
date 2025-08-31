import axios from "axios";
import type {
  RequestCategoriesResponse,
  RequestTokenResponse,
  RequestTriviaResponse,
  Trivia,
} from "../types/openTrivia";
import { decodeHtmlEntities } from "../application/utils";
import { shuffleAnswers } from "../application/trivia";

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
    trivia.shuffledAnswers = shuffleAnswers(trivia);
  });
  return response.data;
};

export const getCategories = async (): Promise<RequestCategoriesResponse> => {
  const url = "https://opentdb.com/api_category.php";
  const response = await axios.get(url);
  return response.data;
};

export const getToken = async (): Promise<RequestTokenResponse> => {
  const url = "https://opentdb.com/api_token.php?command=request";
  const response = await axios.get(url);
  return response.data;
}
