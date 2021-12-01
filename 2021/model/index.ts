import { extractLines } from "./helpers.ts";

interface IPaths {
  input: {
    first: string;
    second: string;
  };
  test: {
    first: string;
    second: string;
  };
}

class ProblemSolver {
  private paths: IPaths;

  constructor(
    private readonly dirname: string,
    private solveFirstProblem: (input: number[]) => number,
    private solveSecondProblem: (input: number[]) => number | undefined,
    private readonly useSameEntries = true
  ) {
    this.paths = {
      input: {
        first: this.dirname + "input",
        second: this.dirname + (this.useSameEntries ? "input" : "input2"),
      },
      test: {
        first: this.dirname + "test",
        second: this.dirname + (this.useSameEntries ? "test" : "test2"),
      },
    };
  }

  private run = (entry: number[], entry2: number[], title: string) => {
    console.log("");
    console.log(`=== Solving : ${title} ===`);

    const timeLabel = `Problem solved in`;
    console.time(timeLabel);
    console.log(`First : ${this.solveFirstProblem(entry)}`);

    const shouldRunSecondProblem = this.solveSecondProblem !== undefined;
    if (shouldRunSecondProblem) {
      console.log(`Second : ${this.solveSecondProblem(entry2)}`);
    }
    console.timeEnd(timeLabel);
  };

  test = async () => {
    const entry = await extractLines(this.paths.test.first);
    const entry2 = await extractLines(this.paths.test.second);
    this.run(entry, entry2, "Test");
  };

  solve = async () => {
    const entry = await extractLines(this.paths.input.first);
    const entry2 = await extractLines(this.paths.input.second);
    this.run(entry, entry2, "Solution");
  };
}

export default ProblemSolver;
