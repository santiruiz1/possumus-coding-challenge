import axios from "axios";
import type {
  RequestCategoriesResponse,
  RequestTriviaResponse,
} from "../types/openTrivia";

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
  return response.data;
};

export const getCategories = async (): Promise<RequestCategoriesResponse> => {
  const url = "https://opentdb.com/api_category.php";
  const response = await axios.get(url);
  return response.data;
};
