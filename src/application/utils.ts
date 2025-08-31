export function decodeHtmlEntities(text: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));