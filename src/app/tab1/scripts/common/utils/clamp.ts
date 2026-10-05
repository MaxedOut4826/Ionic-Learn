export function clamp(number: number, min: number, max: number): number {
  if (min === undefined) {
    throw new Error("Missing 'min' parameter in clamp() function call");
  }

  if (max === undefined) {
    throw new Error("Missing 'max' parameter in clamp() function call");
  }

  return Math.min(Math.max(number, min), max);
}
