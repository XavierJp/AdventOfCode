import { sum, range } from "../../helpers/index.ts";

const thanksForAllTheFish = (
  input: number[],
  day: number,
  limit: number
): number[] => {
  const newGuys = [] as number[];
  if (day === limit) {
    return [input.length];
  }
  const newPopulation = input.map((guy) => {
    const guyAge = guy - 1;
    if (guyAge < 0) {
      newGuys.push(8);
      return 6;
    }
    return guyAge;
  });

  return thanksForAllTheFish([...newPopulation, ...newGuys], day + 1, limit);
};

const letsInvadeTheOcean = (input: number[], limit: number): number => {
  let fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((el) => (fishes[el] += 1));

  range(1, limit).map(() => {
    //every days
    const newFishes = [...fishes];
    range(8, 0).map((idx) => {
      if (idx === 0) {
        newFishes[6] += fishes[idx];
        newFishes[8] = fishes[idx];
      } else {
        newFishes[idx - 1] = fishes[idx];
      }
    });
    fishes = [...newFishes];
  });
  return sum(fishes);
};

const firstProblem = (input: number[][]) =>
  thanksForAllTheFish(input[0], 0, 80)[0];

const secondProblem = (input: number[][]) => letsInvadeTheOcean(input[0], 256);

const lineParser = (line: string) =>
  line.split(",").map((e) => parseInt(e, 10));

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
