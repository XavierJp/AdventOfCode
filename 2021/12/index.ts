import { sum, range } from "../../helpers/index.ts";

interface IGraph {
  [key: string]: string[];
}

const recur1 = (graph: IGraph, key: string, visited: string[]) => {
  const possibleNextSteps = graph[key].filter((val: string) => {
    if (val === "start") {
      return false;
    }
    if (val.toLowerCase() === val && visited.indexOf(val) > -1) {
      return false;
    }
    return true;
  });
  return possibleNextSteps.reduce((paths: string[], step) => {
    const newPath = [...visited, step];
    if (step === "end") {
      paths.push(newPath.join(","));
    } else {
      paths = [...paths, ...recur1(graph, step, newPath)];
    }
    return paths;
  }, []);
};

const computeGraph = (input: string[]) => {
  const graph = {} as IGraph;

  input.forEach((line) => {
    const [pointA, pointB] = line.split("-");
    if (graph[pointA]) {
      graph[pointA].push(pointB);
    } else {
      graph[pointA] = [pointB];
    }
    if (graph[pointB]) {
      graph[pointB].push(pointA);
    } else {
      graph[pointB] = [pointA];
    }
  });
  return graph;
};

const firstProblem = (input: string[]) => {
  const graph = computeGraph(input);

  const paths = recur1(graph, "start", ["start"]);
  return paths.length;
};

const recur2 = (
  graph: IGraph,
  key: string,
  visited: string[],
  canVisitAlowerCase = true
) => {
  const possibleNextSteps = graph[key].filter((val: string) => {
    if (val === "start") {
      return false;
    }
    if (val.toLowerCase() === val && visited.indexOf(val) > -1) {
      if (canVisitAlowerCase) {
        return true;
      }
      return false;
    }
    return true;
  });
  return possibleNextSteps.reduce((paths: string[], step) => {
    const localCanVisit =
      canVisitAlowerCase &&
      !(step === step.toLowerCase() && visited.indexOf(step) > -1);

    const newPath = [...visited, step];
    if (step === "end") {
      paths.push(newPath.join(","));
    } else {
      paths = [...paths, ...recur2(graph, step, newPath, localCanVisit)];
    }
    return paths;
  }, []);
};

const secondProblem = (input: string[]) => {
  const graph = computeGraph(input);

  const paths = recur2(graph, "start", ["start"]);
  return paths.length;
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
