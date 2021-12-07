import { sum, range } from "../../helpers/index.ts";

const alignTheCrabs = (input: number[][]) => {
  const crabsPositions = input[0];

  const costToAlign = [] as number[];
  range(0, crabsPositions.length).map((alignTo) => {
    let cost = 0;
    crabsPositions.forEach((pos) => {
      cost += Math.abs(alignTo - pos);
    });
    costToAlign[alignTo] = cost;
  });
  return Math.min(...costToAlign);
};

const alignTheCrabs2 = (input: number[][]) => {
  const crabsPositions = input[0];

  const costToAlign = [] as number[];
  range(0, crabsPositions.length).map((alignTo) => {
    let cost = 0;
    crabsPositions.forEach((pos) => {
      const n = Math.abs(alignTo - pos);
      cost += (n * (n + 1)) / 2;
    });
    costToAlign[alignTo] = cost;
  });
  return Math.min(...costToAlign);
};

const firstProblem = (input: number[][]) => alignTheCrabs(input);

const secondProblem = (input: number[][]) => alignTheCrabs2(input);

const lineParser = (line: string) =>
  line.split(",").map((e) => parseInt(e, 10));

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
