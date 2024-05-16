export class Memory {
  private memo: {
    [key: string]: {
      value: number;
      solution: RoofSolution | null;
    }
  };

  constructor() {
    this.memo = {};
  }

  add(dimensions: RectangularDimensions, obj: { value: number, solution: RoofSolution | null }) {
    const key = this.generateKey(dimensions);

    this.memo[key] = obj;
  }

  getValue(dimensions: RectangularDimensions) {
    const key = this.generateKey(dimensions);
    if (key in this.memo) {
      return this.memo[key].value;
    }

    return null;
  }

  getSolution(dimensions: RectangularDimensions) {
    const key = this.generateKey(dimensions);
    if (key in this.memo) {
      return this.memo[key].solution;
    }

    return null;
  }

  private generateKey(dimensions: RectangularDimensions) {
    return `${dimensions.horizontal},${dimensions.vertical}`;
  }
}
