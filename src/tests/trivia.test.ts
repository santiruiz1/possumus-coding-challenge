import { describe, expect, test } from "@jest/globals";
import { getCategories, getTrivias } from "../services/openTrivia";

describe("Traer trivias y categorias", () => {
  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });
  test('Traer 5 trivias de temáticas aleatorias y tipo "multiple"', async () => {
    const trivias = await getTrivias({ difficulty: null, category: null});
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
  test('Traer las categorías disponibles', async () => {
    const categories = await getCategories();
    expect(categories.trivia_categories.length).toBeGreaterThan(0);
  })
});