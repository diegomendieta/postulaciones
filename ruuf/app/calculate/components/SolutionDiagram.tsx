import { CSSProperties } from "react";

interface Props {
  roofDimensions: {
    horizontal: number;
    vertical: number;
  }
  solution: PanelPlacement[];
}

export const SolutionDiagram = ({ roofDimensions, solution }: Props) => {
  const outerRectangleStyle = {
    position: 'relative' as CSSProperties['position'],
    width: `${roofDimensions.horizontal}rem`,
    height: `${roofDimensions.vertical}rem`,
    border: '1px solid black'
  }

  const innerRectangleStyles = solution.map(solution => ({
    position: 'absolute' as CSSProperties['position'],
    top: `${solution.topLeftCoordinate.y}rem`,
    left: `${solution.topLeftCoordinate.x}rem`,
    width: `${solution.dimensions.horizontal}rem`,
    height: `${solution.dimensions.vertical}rem`,
    border: '1px solid red',
  }));
  

  return (
    <div style={outerRectangleStyle}>
      { solution.map((_, index) => (<div key={index} style={innerRectangleStyles[index]}></div>)) }
    </div>
  )
}
