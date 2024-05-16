interface Coordinate {
  x: number;
  y: number;
}

interface RectangularDimensions {
  horizontal: number;
  vertical: number;
}

interface Panel {
  dimensions: RectangularDimensions;
  topLeftCoordinate: Coordinate;
}

interface Roof {
  dimensions: RectangularDimensions;
  topLeftCoordinate: Coordinate;
}
