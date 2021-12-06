import { range } from "../../helpers/index.ts";

interface ICoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const findDangerousAreas = (input: ICoords[], useDiagonals = false) => {
  const soil = {} as { [key: string]: number };

  const addSoil = (x: number, y: number) => {
    const key = `${x}-${y}`;
    soil[key] = (soil[key] || 0) + 1;
  };

  input.forEach((coords) => {
    // same row
    if (coords.x1 === coords.x2) {
      range(coords.y1, coords.y2).map((i) => addSoil(coords.x1, i));
    }
    // same column
    else if (coords.y1 === coords.y2) {
      range(coords.x1, coords.x2).map((i) => addSoil(i, coords.y1));
    }
    //diag column
    else if (
      useDiagonals &&
      coords.y1 !== coords.y2 &&
      coords.x1 !== coords.x2
    ) {
      const yRange = range(coords.y1, coords.y2);
      range(coords.x1, coords.x2).map((i, index) => {
        addSoil(i, yRange[index]);
      });
    }
  });
  return Object.values(soil).filter((el) => el > 1).length;
};

const firstProblem = (input: ICoords[]) => findDangerousAreas(input);

const secondProblem = (input: ICoords[]) => findDangerousAreas(input, true);

const lineParser = (line: string) => {
  const pair = line.split(" -> ");
  const coord1 = pair[0].split(",");
  const coord2 = pair[1].split(",");
  return {
    x1: parseInt(coord1[0], 10),
    y1: parseInt(coord1[1], 10),
    x2: parseInt(coord2[0], 10),
    y2: parseInt(coord2[1], 10),
  };
};

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
