import { extractLines } from "../utils/index.ts";

const dirname = new URL(".", import.meta.url).pathname;

const extractInput = async () => await extractLines(dirname + "input");
const extractTest = async () => await extractLines(dirname + "test");

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

const firstProblem = async () => {
  const input = await extractInput();
  return countIncrease(input);
};

const secondProblem = async () => {
  const input = await extractInput();
  const threeMeasurements = [];
  const threeMeasurementCount = input.length - 2;
  for (let i = 0; i < threeMeasurementCount; i++) {
    threeMeasurements[i] = input[i] + input[i + 1] + input[i + 2];
  }
  return countIncrease(threeMeasurements);
};

console.log("==== Answers ====");
console.log(`1: ${await firstProblem()}`);
console.log(`2: ${await secondProblem()}`);
export default {};
