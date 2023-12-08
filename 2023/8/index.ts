const index = (input: string[]) => {
  const instructions = [] as number[];
  const map = {};
  const startingNodes = [] as string[];

  input.forEach((line, index) => {
    if (index === 0) {
      line.split("").forEach((LOrR) => instructions.push(LOrR === "L" ? 0 : 1));
    }
    if (index >= 1) {
      const [key, couple] = line.split(" = ");
      if (key[2] === "A") {
        startingNodes.push(key);
      }
      map[key] = couple.replace("(", "").replace(")", "").split(", ");
    }
  });

  return {
    instructions,
    map,
    startingNodes,
  };
};

const firstProblem = (input: string[]) => {
  const { instructions, map } = index(input);
  let iteration = 0;
  /* needs a different test
    LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
   */
  return 0;
  let step = "AAA";
  while (step !== "ZZZ") {
    for (let instruction of instructions) {
      console.log(instruction, step);
      step = map[step][instruction];
    }
    iteration += 1;
  }
  return iteration * instructions.length;
};

const PPCM = (a, b) => {
  let c = a;
  let d = b;

  while (a !== b) {
    if (a > b) {
      b = b + d;
    } else if (a < b) {
      a = a + c;
    }
  }
  return a;
};

const secondProblem = (input: string[]) => {
  const { instructions, map, startingNodes } = index(input);

  const findZ = (start: string) => {
    let step = start;
    let instructionIdx = 0;
    let path = 0;
    while (step[2] !== "Z") {
      const instruction = instructions[instructionIdx];
      step = map[step][instruction];
      path += 1;

      instructionIdx++;
      if (instructionIdx === instructions.length) {
        instructionIdx = 0;
      }
    }
    return path;
  };

  const endingsNodePathCounts = startingNodes.map((startNode) =>
    findZ(startNode)
  );

  return endingsNodePathCounts.reduce((acc, p) => {
    return PPCM(acc, p);
  }, 1);
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
