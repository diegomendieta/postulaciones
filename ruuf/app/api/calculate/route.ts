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
    const memoizedAmount = memory.get(roof.dimensions);
    if (memoizedAmount !== null) {
      return memoizedAmount
    }
  
    const panel: Panel = {
      topLeftCoordinate: roof.topLeftCoordinate,
      dimensions: panelDimensions
    }
  
    const roofs = [];
  
    if (isFeasibleToPlacePanel(roof, panel)) {
      const [roof1, roof2] = splitRoof(roof, panel, 'horizontally');
      const [roof3, roof4] = splitRoof(roof, panel, 'vertically');
  
      roofs.push([roof1, roof2]);
      roofs.push([roof3, roof4]);
    };

    const rotatedPanel = rotate(panel);
    if (isFeasibleToPlacePanel(roof, rotatedPanel)) {
      const [roof5, roof6] = splitRoof(roof, rotatedPanel, 'horizontally');
      const [roof7, roof8] = splitRoof(roof, rotatedPanel, 'vertically');
  
      roofs.push([roof5, roof6]);
      roofs.push([roof7, roof8]);
    };
  
    const mappedMaxAmountOfPanels = roofs.map((roofs) => {
      const [roof1, roof2] = roofs;
    
      return 1 + maxAmountOfPanelsInRoof(roof1) + maxAmountOfPanelsInRoof(roof2)
    })
  
    const maxAmountOfPanelsArray: number[] = [0, ...mappedMaxAmountOfPanels];
    const max = Math.max(...maxAmountOfPanelsArray);

    memory.add(roof.dimensions, max);
  
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

  return Response.json({
    amount
  })
}