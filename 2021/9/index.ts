import { sum, range } from "../../helpers/index.ts";

const isLowPoint = (i: number, j: number, input: number[][]) => {
  const lineCount = input.length - 1;
  const colCount = input[0].length - 1;
  const point = input[i][j];
  const left = () => point < input[i][j - 1];
  const up = () => point < input[i - 1][j];
  const down = () => point < input[i + 1][j];
  const right = () => point < input[i][j + 1];

  if (i === 0 && j === 0) {
    return right() && down();
  }
  if (i === 0 && j === colCount) {
    return down() && left();
  }
  if (i === lineCount && j === 0) {
    return up() && right();
  }
  if (i === lineCount && j === colCount) {
    return up() && left();
  }
  if (i === 0) {
    return down() && left() && right();
  }
  if (i === lineCount) {
    return up() && left() && right();
  }
  if (j === 0) {
    return down() && up() && right();
  }
  if (j === colCount) {
    return down() && up() && left();
  }
  return down() && up() && right() && left();
};

const lowPoints = (input: number[][]) => {
  const lowPoints = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (isLowPoint(i, j, input)) {
        lowPoints.push([i, j]);
      }
    }
  }
  return lowPoints;
};

const basinFromPoint = (
  i: number,
  j: number,
  input: number[][]
): number[][] => {
  const immediateBasin: number[][] = [];
  const lineCount = input.length - 1;
  const colCount = input[0].length - 1;
  const point = input[i][j];
  const left = () => input[i][j - 1];
  const up = () => input[i - 1][j];
  const down = () => input[i + 1][j];
  const right = () => input[i][j + 1];

  if (i > 0 && point < up() && up() !== 9) {
    immediateBasin.push([i - 1, j]);
  }
  if (j > 0 && point < left() && left() !== 9) {
    immediateBasin.push([i, j - 1]);
  }
  if (j < colCount && point < right() && right() !== 9) {
    immediateBasin.push([i, j + 1]);
  }
  if (i < lineCount && point < down() && down() !== 9) {
    immediateBasin.push([i + 1, j]);
  }

  return immediateBasin.reduce((basin: number[][], currentPoint) => {
    return [
      ...basin,
      currentPoint,
      ...basinFromPoint(currentPoint[0], currentPoint[1], input),
    ];
  }, []);
};

const basins = (input: number[][]) => {
  const allLowPoints = lowPoints(input);
  const allBasins: number[][][] = [];

  allLowPoints.forEach((lowPoint) => {
    allBasins.push([
      lowPoint,
      ...basinFromPoint(lowPoint[0], lowPoint[1], input),
    ]);
  });
  const basinSizes = allBasins.map(
    (basin) => [...new Set(basin.map((el) => el.join("")))].length
  );

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);
};

const firstProblem = (input: number[][]) =>
  sum(lowPoints(input).map((el) => input[el[0]][el[1]] + 1));

const secondProblem = (input: number[][]) => basins(input);

const lineParser = (line: string) =>
  line.split("").map((el) => parseInt(el, 10));

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
