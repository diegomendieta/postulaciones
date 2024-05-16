export class Memory {
  private memo: { [key: string]: number };

  constructor() {
    this.memo = {};
  }

  add(dimensions: RectangularDimensions, numberOfPanels: number) {
    const key = this.generateKey(dimensions);

    this.memo[key] = numberOfPanels;
  }

  get(dimensions: RectangularDimensions) {
    const key = this.generateKey(dimensions);
    if (key in this.memo) {
      return this.memo[key];
    }

    const reversedKey = this.reverseKey(key);
    if (reversedKey in this.memo) {
      return this.memo[reversedKey];
    }

    return null;
  }

  private generateKey(dimensions: RectangularDimensions) {
    return `${dimensions.horizontal},${dimensions.vertical}`;
  }

  private reverseKey(key: string) {
    const [ horizontal, vertical ] = key.split(',');

    return `${vertical},${horizontal}`;
  }
}
