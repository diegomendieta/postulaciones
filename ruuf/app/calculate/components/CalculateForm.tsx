'use client'

import { useState } from "react"
import { SolutionDiagram } from "./SolutionDiagram";

const parseFormData = (formData: FormData) => {
  const roofHeight = formData.get('roofHeight') as string;
  const roofWidth = formData.get('roofWidth') as string;
  const panelHeight = formData.get('panelHeight') as string;
  const panelWidth = formData.get('panelWidth') as string;

  return {
    roofHeight: parseInt(roofHeight),
    roofWidth: parseInt(roofWidth),
    panelHeight: parseInt(panelHeight),
    panelWidth: parseInt(panelWidth),
  }
}

const validateFormData = (formData: FormData) => {
  if (formData.get('roofHeight') === '') return false;
  if (formData.get('roofWidth') === '') return false;
  if (formData.get('panelHeight') === '') return false;
  if (formData.get('panelWidth') === '') return false;

  return true;
}

export const CalculateForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfPanels, setNumberOfPanels] = useState(0);
  const [solution, setSolution] = useState<PanelPlacement[]>([]);
  const [roofDimensions, setRoofDimensions] = useState({ horizontal: 0, vertical: 0 })

  const onSubmit = async (formData: FormData) => {
    if (!validateFormData(formData)){
      return;
    }

    setError('');
    setIsLoading(true);

    const { roofHeight, roofWidth, panelHeight, panelWidth } = parseFormData(formData);
    const body = {
      roof: {
        dimensions: {
          horizontal: roofWidth,
          vertical: roofHeight
        }
      },
      panel: {
        dimensions: {
          horizontal: panelWidth,
          vertical: panelHeight
        }
      }
    }

    setRoofDimensions({ horizontal: roofWidth, vertical: roofHeight });

    const endpoint = '/api/calculate';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(endpoint, options);
      const jsonifiedResponse: CalculatePanelsResponse = await response.json();
  
      const { amount, solution } = jsonifiedResponse;
      setNumberOfPanels(amount);
      setSolution(solution);
    } catch (err) {
      setError('There was an error');
    }

    setIsLoading(false);
  }

  return (
    <div>
      <SolutionDiagram roofDimensions={roofDimensions} solution={solution} />
      <div>
        { error !== '' ? <p>There was an error</p> : null }
        { isLoading ? <p>Loading...</p> : <p>Number of panels: { numberOfPanels }</p> }
      </div>
      <form className='space-y-4' action={onSubmit}>
        <div>
          <label>Roof width: </label>
          <input type='number' name='roofWidth' />
        </div>
        <div>
          <label>Roof height: </label>
          <input type='number' name='roofHeight' />
        </div>
        <div>
          <label>Panel width: </label>
          <input type='number' name='panelWidth' />
        </div>
        <div>
          <label>Panel height: </label>
          <input type='number' name='panelHeight' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
