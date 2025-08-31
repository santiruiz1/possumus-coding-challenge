import { describe, expect, test } from "@jest/globals";
import { getCategories, getTrivias } from "../services/openTrivia";
import { decodeHtmlEntities } from "../application/utils";
import type { Trivia } from "../types/openTrivia";
import { shuffleAnswers } from "../application/trivia";

describe("Traer trivias y categorias", () => {
  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });
  test('Traer 5 trivias de temáticas aleatorias y tipo "multiple"', async () => {
    const trivias = await getTrivias({ difficulty: null, category: null });
    expect(trivias.response_code).toBe(0);
    expect(trivias.results.length).toBe(5);
  }, 6000);
  test("Elegir la temática y dificultad de las trivias", async () => {
    const trivias = await getTrivias({ difficulty: "easy", category: 9 });
    expect(
      trivias.results.every(
        (trivia) =>
          trivia.category === "General Knowledge" &&
          trivia.difficulty === "easy"
      )
    ).toBe(true);
  }, 6000);
  test("Traer las categorías disponibles", async () => {
    const categories = await getCategories();
    expect(categories.trivia_categories.length).toBeGreaterThan(0);
  });
});

describe("Process response", () => {
  test("Decode response", () => {
    const codedString =
      "In the movie &quot;Back to the Future,&quot; what speed does Doc Brown&#039;s DeLorean need to reach in order to travel through time?";
    const decodedString = decodeHtmlEntities(codedString);
    expect(decodedString).toEqual(
      `In the movie "Back to the Future," what speed does Doc Brown's DeLorean need to reach in order to travel through time?`
    );
  });
  test("shuffle questions array", () => {
    const trivia: Trivia = {
      type: "multiple",
      difficulty: "medium",
      category: "History",
      question:
        "What year did the Boxing Day earthquake &amp; tsunami occur in the Indian Ocean?",
      correct_answer: "2004",
      incorrect_answers: ["2006", "2008", "2002"],
    };
    const unshuffled = [...trivia.incorrect_answers, trivia.correct_answer];
    trivia.shuffledAnswers = shuffleAnswers(trivia);
    expect(trivia.shuffledAnswers).not.toEqual(unshuffled);
  });
});
