import ProblemSolver from "../model/index.ts";

const depthByHorizontalPosition = (input: string[][]) => {
  const position = {
    depth: 0,
    horizontal: 0,
  };
  input.forEach((move) => {
    const order = move[0];
    const quantity = parseInt(move[1], 10);
    switch (order) {
      case "up":
        position.depth -= quantity;
        return;
      case "down":
        position.depth += quantity;
        return;
      case "forward":
        position.horizontal += quantity;
        return;
      default:
        throw new Error("should not happen");
    }
  });
  return position.depth * position.horizontal;
};

const depthByHorizontalPositionWithAim = (input: string[][]) => {
  const position = {
    depth: 0,
    horizontal: 0,
    aim: 0,
  };
  input.forEach((move) => {
    const order = move[0];
    const quantity = parseInt(move[1], 10);

    switch (order) {
      case "up":
        position.aim -= quantity;
        return;
      case "down":
        position.aim += quantity;
        return;
      case "forward":
        position.horizontal += quantity;
        position.depth += position.aim * quantity;
        return;
      default:
        throw new Error("should not happen");
    }
  });
  return position.depth * position.horizontal;
};

const firstProblem = (input: string[][]) => depthByHorizontalPosition(input);
const secondProblem = (input: string[][]) =>
  depthByHorizontalPositionWithAim(input);

const dirname = new URL(".", import.meta.url).pathname;

const problem1 = new ProblemSolver(
  dirname,
  (el: string) => el.split(" "),
  firstProblem,
  secondProblem
);

problem1.test();
problem1.solve();

export default {};
