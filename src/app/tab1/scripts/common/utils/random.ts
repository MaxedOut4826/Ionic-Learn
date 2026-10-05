export class Random {
  public static intRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public static floatRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
