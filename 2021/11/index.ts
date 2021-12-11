import { sum, range } from "../../helpers/index.ts";

const findNextFlash = (input: number[][]) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) {
        return [i, j];
      }
    }
  }
  return null;
};

const addIfHasNotFlashed = (val: number) => {
  return val === 0 ? 0 : val + 1;
};

const computeFlashes = (input: number[][]) => {
  // first increment everything
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      input[i][j] += 1;
    }
  }

  // then compute flashes
  let flashes = 0;
  let nextFlash = findNextFlash(input);
  while (nextFlash) {
    flashes += 1;
    const i = nextFlash[0];
    const j = nextFlash[1];
    input[i][j] = 0;

    if (i > 0) {
      input[i - 1][j] = addIfHasNotFlashed(input[i - 1][j]);
    }
    if (i < input.length - 1) {
      input[i + 1][j] = addIfHasNotFlashed(input[i + 1][j]);
    }
    if (j < input[0].length - 1) {
      input[i][j + 1] = addIfHasNotFlashed(input[i][j + 1]);
    }
    if (j > 0) {
      input[i][j - 1] = addIfHasNotFlashed(input[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      input[i - 1][j - 1] = addIfHasNotFlashed(input[i - 1][j - 1]);
    }
    if (i < input.length - 1 && j < input[0].length - 1) {
      input[i + 1][j + 1] = addIfHasNotFlashed(input[i + 1][j + 1]);
    }
    if (j < input[0].length - 1 && i > 0) {
      input[i - 1][j + 1] = addIfHasNotFlashed(input[i - 1][j + 1]);
    }
    if (j > 0 && i < input.length - 1) {
      input[i + 1][j - 1] = addIfHasNotFlashed(input[i + 1][j - 1]);
    }

    nextFlash = findNextFlash(input);
  }
  return flashes;
};

const computeAllFlashes = (input: number[][]) => {
  let flashes = 0;
  range(0, 99).forEach(() => {
    flashes += computeFlashes(input);
  });
  return flashes;
};
const synchronized = (input: number[][]) => {
  let step = 1;
  const octopuses = input.length * input[0].length;
  while (step) {
    const flashes = computeFlashes(input);
    if (flashes === octopuses) {
      return step;
    }
    step++;
  }
};

const firstProblem = (input: number[][]) => computeAllFlashes(input);

const secondProblem = (input: number[][]) => synchronized(input);

const lineParser = (line: string) => line.split("").map((e) => parseInt(e, 10));

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
