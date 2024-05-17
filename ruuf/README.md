# Ruuf application

The problem to be solved consists of finding the maximum number of rectangles with dimensions "a" and "b" (solar panels) that fit inside a rectangle with dimensions "x" and "y" (roof) and drawing them.

## Solution

The solution consists of a Next.js application with the route `/calculate` and the endpoint `/api/endpoint`.

The endpoint `/api/endpoint` receives the dimensions of the roof and the solar panels, and returns the maximum number of solar panels that can be placed on the roof, along with the arrangement in which this is achieved. The graphical representation of the problem can be viewed at the route `/calculate`.

The problem is approached using dynamic programming. Starting from the largest rectangle, a solar panel is placed in the corner, the rest of the rectangle is subdivided into two, and the problem is solved again for the smaller rectangles.

It should be noted that, since the panels can be rotated, their positioning must be evaluated in two directions. Additionally, it is possible to divide the remaining area of the rectangle in two ways (with horizontal or vertical cuts). Therefore, each rectangle leads to 4 possible subproblems.

## How to run

```sh
yarn  # to install the dependencies
yarn dev  # to run in dev mode
```
