const isSymbol = (char: string) => {
  // return char === "*";
  if (!char) {
    throw new Error("Should not happen");
  }
  return char !== "." && Number.isNaN(parseInt(char, 10));
};

const firstProblem = (input: string[]) => {
  return input
    .map((line) => {
      const [_a, numbers] = line.split(": ");
      const [win, game] = numbers.split(" | ");
      const winNums = win.split(" ").filter((a) => a !== "");
      return game
        .split(" ")
        .map((a) => {
          if (a !== "" && winNums.indexOf(a) > -1) {
            return a;
          }
          return "";
        })
        .filter((a) => a !== "");
    })
    .map((w) => {
      if (w.length === 0) {
        return 0;
      }
      return Math.pow(2, w.length - 1);
    })
    .reduce((sum, el) => sum + el, 0);
};

const secondProblem = (input: string[]) => {
  const copies = input.map((i) => 1);
  input
    .map((line) => {
      const [_a, numbers] = line.split(": ");
      const [win, game] = numbers.split(" | ");
      const winNums = win.split(" ").filter((a) => a !== "");
      return game
        .split(" ")
        .map((a) => {
          if (a !== "" && winNums.indexOf(a) > -1) {
            return a;
          }
          return "";
        })
        .filter((a) => a !== "");
    })
    .forEach((w, index) => {
      const wins = w.length;
      let i = index + 1;
      console.log("card : ", i);
      while (i < index + 1 + wins) {
        copies[i] += copies[index];
        i++;
      }
    });

  return copies.reduce((sum, el) => sum + el, 0);
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
