export async function sleep(seconds: number): Promise<void> {
  return new Promise((callback) => setTimeout(callback, seconds * 1000));
}
