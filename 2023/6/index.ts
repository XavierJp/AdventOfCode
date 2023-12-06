const firstProblem = (input: string[]) => {
  const times = input[0]
    .replace("Time:", "")
    .split(" ")
    .filter((e) => e !== "")
    .map((e) => parseInt(e, 10));

  const max = input[1]
    .replace("Distance:", "")
    .split(" ")
    .filter((e) => e !== "")
    .map((e) => parseInt(e, 10));

  return times.reduce((product, raceDuration, index) => {
    const races = [] as number[];
    for (let t = 0; t < raceDuration; t++) {
      const length = t * (raceDuration - t);
      if (length > max[index]) {
        races.push(length);
      }
    }
    return product * races.length;
  }, 1);
};

const secondProblem = (input: string[]) => {
  const time = parseInt(input[0].replace("Time:", "").split(" ").join(""), 10);
  const max = parseInt(
    input[1].replace("Distance:", "").split(" ").join(""),
    10
  );

  let races = 0;
  for (let t = 0; t < time; t++) {
    const length = t * (time - t);
    if (length > max) {
      races += 1;
    }
  }

  return races;
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
