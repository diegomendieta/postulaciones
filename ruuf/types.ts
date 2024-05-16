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

interface RoofSolution {
  panel: Panel;
  splitDirection: 'horizontally' | 'vertically'
}

interface PanelPlacement {
  topLeftCoordinate: Coordinate;
  dimensions: {
    horizontal: number;
    vertical: number;
  }
}

interface CalculatePanelsResponse {
  amount: number;
  solution: PanelPlacement[]
}
