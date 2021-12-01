import { extractInput } from "../utils";

const determineIncreasedCount = (input) => {
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

const firstProblem = () => {
  const input = extractInput();
  const increased = determineIncreasedCount(input);
  console.log(increased);
};

const secondProblem = () => {
  const input = extractInput();
  const threeMeasurements = [];
  const threeMeasurementCount = input.length - 2;
  for (let i = 0; i < threeMeasurementCount; i++) {
    threeMeasurements[i] = input[i] + input[i + 1] + input[i + 2];
  }
  const increased = determineIncreasedCount(threeMeasurements);
  console.log(increased);
};

firstProblem();
secondProblem();
export default {};
