export function fillArray<T>(arr: T[], targetLength: number, defaultValue: T): T[] {
  if (arr.length >= targetLength) {
    return arr;
  }
  return arr.concat(Array(targetLength - arr.length).fill(defaultValue));
}
