export function decodeHtmlEntities(text: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}