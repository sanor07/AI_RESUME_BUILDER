/**
 * Splits a multi-line description into an array of cleaned lines
 * (strips leading bullet characters). A single line stays as plain text
 * in the calling component; multiple lines are rendered as a <ul>.
 * Direct port of the original formatDesc() logic, minus manual HTML
 * escaping — JSX handles that automatically.
 */
export function splitDescLines(text) {
  if (!text) return [];
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^[•-]\s*/, ''));
}
