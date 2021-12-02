import ProblemSolver from "../model/index.ts";

const countIncrease = (input: number[]) => {
  let increased = 0;
  input.forEach((record, index) => {
    if (index === 0) {
      return;
    }
    if (record - input[index - 1] > 0) {
      increased += 1;
    }
  });
  return increased;
};
const dirname = new URL(".", import.meta.url).pathname;

const firstProblem = (input: number[]) => countIncrease(input);

const secondProblem = (input: number[]) => {
  const threeMeasurements = [];
  const threeMeasurementCount = input.length - 2;
  for (let i = 0; i < threeMeasurementCount; i++) {
    threeMeasurements[i] = input[i] + input[i + 1] + input[i + 2];
  }
  return countIncrease(threeMeasurements);
};

const problem1 = new ProblemSolver(
  dirname,
  (el: string) => parseInt(el, 10),
  firstProblem,
  secondProblem
);

problem1.test();
problem1.solve();

export default {};
