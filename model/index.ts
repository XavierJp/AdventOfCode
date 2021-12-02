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
    private parseCallback: (el: string) => any,
    private solveFirstProblem: (input: any[]) => number,
    private solveSecondProblem?: (input: any[]) => number,
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

  private extractLines = async (filePath: string): Promise<any[]> => {
    const input = await Deno.readTextFile(filePath);
    const lines = input.toString().split("\n");
    return lines.filter((line) => line !== "").map(this.parseCallback);
  };

  private run = (entry: any[], entry2: any[], title: string) => {
    console.log("");
    console.log(`=== Solving : ${title} ===`);

    const timeLabel = `Problem solved in`;
    console.time(timeLabel);
    console.log(`First : ${this.solveFirstProblem(entry)}`);

    if (this.solveSecondProblem !== undefined) {
      console.log(`Second : ${this.solveSecondProblem(entry2)}`);
    }
    console.timeEnd(timeLabel);
  };

  test = async () => {
    const entry = await this.extractLines(this.paths.test.first);
    const entry2 = await this.extractLines(this.paths.test.second);
    this.run(entry, entry2, "Test");
  };

  solve = async () => {
    const entry = await this.extractLines(this.paths.input.first);
    const entry2 = await this.extractLines(this.paths.input.second);
    this.run(entry, entry2, "Solution");
  };
}

export default ProblemSolver;
