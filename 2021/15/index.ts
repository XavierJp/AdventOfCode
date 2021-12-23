import { sum, range } from "../../helpers/index.ts";

interface INode {
  next: string[];
  score: number;
  val: number;
  key: string;
}

const key = (a: number, b: number) => `${a},${b}`;

const getGraph = (input: number[][]) => {
  const graph = {} as { [key: string]: INode };
  for (let line = 0; line < input.length; line++) {
    for (let col = 0; col < input[line].length; col++) {
      graph[key(line, col)] = {
        next: [],
        score: -1,
        val: input[line][col],
        key: key(line, col),
      };
      if (line > 0) {
        graph[key(line, col)].next.push(key(line - 1, col));
      }
      if (line < input.length - 1) {
        graph[key(line, col)].next.push(key(line + 1, col));
      }
      if (col < input[line].length - 1) {
        graph[key(line, col)].next.push(key(line, col + 1));
      }
      if (col > 0) {
        graph[key(line, col)].next.push(key(line, col - 1));
      }

      if (col === 0 && line === 0) {
        graph[key(line, col)].score = 0;
      } else {
        const adjacent = graph[key(line, col)].next;
        const previousScores = adjacent.reduce((paths, node) => {
          if (graph[node] && graph[node].score !== -1) {
            paths.push(graph[node].score);
          }
          return paths;
        }, [] as number[]);
        graph[key(line, col)].score =
          Math.min(...previousScores) + input[line][col];
      }
    }
  }
  return graph;
};

const lookForOptimize = (graph: { [key: string]: INode }) => {
  Object.values(graph).forEach((node) => {
    node.next.forEach((key) => {
      if (graph[key].score + node.val < node.score) {
        return node.key;
      }
    });
  });
  return null;
};

const firstProblem = (input: number[][]) => {
  const graph = getGraph(input);
  const naiveScore = graph[key(input.length - 1, input[0].length - 1)].score;
  let score = naiveScore;

  let shouldOptimize = true;
  while (shouldOptimize)

      shouldOptimize =
        graph[key(input.length - 1, input[0].length - 1)].score < score;
      score = graph[key(input.length - 1, input[0].length - 1)].score;
    }

  return naiveScore;
};

const secondProblem = (input: string[]) => {};

const lineParser = (line: string) =>
  line.split("").map((el) => parseInt(el, 10));

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
