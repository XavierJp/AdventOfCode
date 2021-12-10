import { sum, range } from "../../helpers/index.ts";

interface ILine {
  entry: string[];
  output: string[];
  all: string[];
}

const countEasy = (input: ILine[]) => {
  const specificLength = [2, 3, 4, 7];
  return input.reduce((sum, line) => {
    sum += line.output.filter(
      (el) => specificLength.indexOf(el.length) > -1
    ).length;
    return sum;
  }, 0);
};

const findNums = (line: ILine, length: number) => {
  const found = new Set<string>();
  line.entry.forEach((code) => {
    if (code.length === length) {
      const c = convert(code);
      found.add(c.join(","));
    }
  });

  return [...found].map((el) =>
    el.split(",").map((e) => parseInt(e, 10))
  ) as number[][];
};

const convert = (code: string) => {
  const letterMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6 };
  const wires = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < code.length; i++) {
    const letter = code[i];
    //@ts-ignore
    wires[letterMap[letter]] = 1;
  }
  return wires;
};

const d = (x: number[], y: number[]) => {
  return x.map((el, idx) => (y[idx] !== el ? el : 0));
};

const intersection = (x: number[], y: number[]) => {
  return x.map((el, idx) => (y[idx] === el ? el : 0));
};

const decypher = (input: ILine[]) => {
  const res = input.map((line) => {
    const one = findNums(line, 2)[0];
    const four = findNums(line, 4)[0];
    const seven = findNums(line, 3)[0];
    const eight = findNums(line, 7)[0];
    const three = eight.map((el, index) => (one[index] === 1 ? 0 : 1));

    const sixOrNineOrZero = findNums(line, 6);
    const fiveOrTwo = findNums(line, 5).filter(
      (el) => el.join("") !== three.join("")
    );
  });
};

const firstProblem = (input: ILine[]) => countEasy(input);

const secondProblem = (input: ILine[]) => decypher(input);

const lineParser = (line: string) => {
  const el = line.split(" | ");
  return {
    entry: el[0].split(" "),
    output: el[1].split(" "),
    all: line.replace("| ", "").split(" "),
  };
};

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
