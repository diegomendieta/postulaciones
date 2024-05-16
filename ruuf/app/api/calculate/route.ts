import { getMaxAndIndex } from "@/app/utils";
import { rotate, splitRoof, isFeasibleToPlacePanel } from "./helpers"
import { Memory } from "./memory";

export async function POST(request: Request) {
  const { 
    roof: {
      dimensions: {
        horizontal: roofHorizontalDimension,
        vertical: roofVerticalDimension
      }
    },
    panel: {
      dimensions: {
        horizontal: panelHorizontalDimension,
        vertical: panelVerticalDimension,
      }
    }
  } = await request.json();

  const memory = new Memory();

  const panelDimensions: RectangularDimensions = {
    horizontal: panelHorizontalDimension,
    vertical: panelVerticalDimension
  }

  function maxAmountOfPanelsInRoof(roof: Roof) {
    const memoizedAmount = memory.getValue(roof.dimensions);
    if (memoizedAmount !== null) {
      return memoizedAmount
    }

    const splittedRoofs: Array<[Roof, Roof]> = [];
    const solutions: Array<RoofSolution | null> = [null];
  
    const panel: Panel = {
      topLeftCoordinate: roof.topLeftCoordinate,
      dimensions: panelDimensions
    }
    if (isFeasibleToPlacePanel(roof, panel)) {
      const [roof1, roof2] = splitRoof(roof, panel, 'horizontally');
      const [roof3, roof4] = splitRoof(roof, panel, 'vertically');
  
      splittedRoofs.push([roof1, roof2]);
      solutions.push({ panel, splitDirection: 'horizontally' });

      splittedRoofs.push([roof3, roof4]);
      solutions.push({ panel, splitDirection: 'vertically' });
    };

    const rotatedPanel = rotate(panel);
    if (isFeasibleToPlacePanel(roof, rotatedPanel)) {
      const [roof5, roof6] = splitRoof(roof, rotatedPanel, 'horizontally');
      const [roof7, roof8] = splitRoof(roof, rotatedPanel, 'vertically');

      splittedRoofs.push([roof5, roof6]);
      solutions.push({ panel: rotatedPanel, splitDirection: 'horizontally' })

      splittedRoofs.push([roof7, roof8]);
      solutions.push({ panel: rotatedPanel, splitDirection: 'vertically' })
    };
  
    const mappedMaxAmountOfPanels = splittedRoofs.map((roofs) => {
      const [roof1, roof2] = roofs;
    
      return 1 + maxAmountOfPanelsInRoof(roof1) + maxAmountOfPanelsInRoof(roof2)
    })
  
    const maxAmountOfPanelsArray: number[] = [0, ...mappedMaxAmountOfPanels];
    const { max, index } = getMaxAndIndex(maxAmountOfPanelsArray);

    const solution = solutions[index];

    memory.add(roof.dimensions, { value: max, solution });
  
    return max;
  }

  const roof: Roof = {
    topLeftCoordinate: { x: 0, y: 0 },
    dimensions: {
      horizontal: roofHorizontalDimension,
      vertical: roofVerticalDimension,
    }
  }
  const amount = maxAmountOfPanelsInRoof(roof);

  const solution: RoofSolution[] = [];

  function retrieveSolution(roof: Roof) {
    const memoizedSol = memory.getSolution(roof.dimensions);
    if (memoizedSol === null) {
      return;
    }

    const sol: RoofSolution = {
      panel: {
        topLeftCoordinate: roof.topLeftCoordinate,
        dimensions: memoizedSol.panel.dimensions
      },
      splitDirection: memoizedSol.splitDirection
    }

    solution.push(sol);
    const [roof1, roof2] = splitRoof(roof, sol.panel, sol.splitDirection);

    retrieveSolution(roof1);
    retrieveSolution(roof2);
  }

  retrieveSolution(roof);

  const response = {
    amount,
    solution: solution.map(sol => ({
      topLeftCoordinate: sol.panel.topLeftCoordinate,
      dimensions: sol.panel.dimensions
    }))
  };

  return Response.json(response);
}