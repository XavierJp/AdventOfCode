import { sum, range } from "../../helpers/index.ts";

const valids = [/\(\)/g, /\[\]/g, /\{\}/g, /\<\>/g];
const closingTable = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
} as { [key: string]: string };

const scoresCorrupted = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
} as { [key: string]: number };

const scoresIncomplete = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
} as { [key: string]: number };

const lookForSyntaxError = (input: string[], complete = false) => {
  const corrupted = [] as string[];
  const incomplete = [] as string[];

  input.forEach((line) => {
    let shouldContinue = true;
    let tmp = line;
    while (shouldContinue) {
      shouldContinue = false;
      valids.forEach((valid) => {
        const size = tmp.length;
        const newTmp = tmp.replace(valid, "");
        shouldContinue = shouldContinue || size !== newTmp.length;
        tmp = newTmp;
      });
    }
    if (tmp.length > 0) {
      const closingChar = tmp
        .split("")
        .find((char) => Object.keys(scoresCorrupted).indexOf(char) > -1);
      if (closingChar) {
        // corrupted
        corrupted.push(closingChar);
      } else {
        // incomplete
        let completion = "";
        for (let i = tmp.length - 1; i >= 0; i--) {
          const toClose = tmp[i];
          const closer = closingTable[toClose];
          completion += closer;
        }
        incomplete.push(completion);
      }
    }
  });
  const corruptionScore = sum(corrupted.map((el) => scoresCorrupted[el]));
  const completionScores = incomplete.map((line) =>
    line
      .split("")
      .map((el) => scoresIncomplete[el])
      .reduce((product, score) => 5 * product + score, 0)
  );
  completionScores.sort((a, b) => a - b);

  return complete
    ? completionScores[Math.floor(completionScores.length / 2)]
    : corruptionScore;
};

const firstProblem = (input: string[]) => lookForSyntaxError(input);

const secondProblem = (input: string[]) => lookForSyntaxError(input, true);

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
