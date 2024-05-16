export function rotate(rotatable: Panel) {
  return {
    ...rotatable,
    dimensions: {
      horizontal: rotatable.dimensions.vertical,
      vertical: rotatable.dimensions.horizontal
    }
  }
}

export function isFeasibleToPlacePanel(roof: Roof, panel: Panel) {
  return (
    panel.dimensions.horizontal <= roof.dimensions.horizontal &&
    panel.dimensions.vertical <= roof.dimensions.vertical
  )
}

export function splitRoof(roof: Roof, panel: Panel, direction: 'horizontally' | 'vertically'): [Roof, Roof] {
  if (direction === 'horizontally') {
    return splitRoofHorizontally(roof, panel);
  }

  if (direction === 'vertically') {
    return splitRoofVertically(roof, panel);
  }

  throw new Error("Direction must be 'horizontally' or 'vertically'");
}

function splitRoofHorizontally(roof: Roof, panel: Panel): [Roof, Roof] {
  const roof1: Roof = {
    topLeftCoordinate: topRightCoordinate(panel),
    dimensions: {
      horizontal: roof.dimensions.horizontal - panel.dimensions.horizontal,
      vertical: panel.dimensions.vertical
    }
  }

  const roof2: Roof = {
    topLeftCoordinate: bottomLeftCoordinate(panel),
    dimensions: {
      horizontal: roof.dimensions.horizontal,
      vertical: roof.dimensions.vertical - panel.dimensions.vertical
    }
  }

  return [roof1, roof2];
}

function splitRoofVertically(roof: Roof, panel: Panel): [Roof, Roof] {
  const roof1: Roof = {
    topLeftCoordinate: topRightCoordinate(panel),
    dimensions: {
      horizontal: roof.dimensions.horizontal - panel.dimensions.horizontal,
      vertical: roof.dimensions.vertical
    }
  }

  const roof2: Roof = {
    topLeftCoordinate: bottomLeftCoordinate(panel),
    dimensions: {
      horizontal: panel.dimensions.horizontal,
      vertical: roof.dimensions.vertical - panel.dimensions.vertical
    }
  }

  return [roof1, roof2];
}

function bottomLeftCoordinate(panel: Panel): Coordinate {
  return {
    x: panel.topLeftCoordinate.x,
    y: panel.topLeftCoordinate.y + panel.dimensions.vertical,
  }
}

function topRightCoordinate(panel: Panel): Coordinate {
  return {
    x: panel.topLeftCoordinate.x + panel.dimensions.horizontal,
    y: panel.topLeftCoordinate.y,
  }
}
