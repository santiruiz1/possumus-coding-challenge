export function decodeHtmlEntities(text: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const finalMessage = (points: number) => {
  if (points === 100) return "Perfect score! You're a trivia master!🤩";
  if (points === 80) return "Great job! You really know your stuff!😎";
  if (points === 60) return "Nice! You did really good.👍";
  if (points === 40) return "Nice try! You can do better.😕";
  if (points === 20) return "Maybe you should grab a book.🤨";
  return "Wow! That was really bad. Did you even go to school?😬";
}