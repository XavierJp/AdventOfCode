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

const firstProblem = (input: number[]) => countIncrease(input);

const secondProblem = (input: number[]) => {
  const threeMeasurements = [];
  const threeMeasurementCount = input.length - 2;
  for (let i = 0; i < threeMeasurementCount; i++) {
    threeMeasurements[i] = input[i] + input[i + 1] + input[i + 2];
  }
  return countIncrease(threeMeasurements);
};

const lineParser = (line: string) => parseInt(line, 10);

export { firstProblem, secondProblem, lineParser };
