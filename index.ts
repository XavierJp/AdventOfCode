import ProblemSolver from "./model/index.ts";

const ERRORS = {
  NOARGS:
    "🥦 Please provide a year and a day. Eg npm run dev -- year=2021 day=1",
};

try {
  if (Deno.args) {
    const args = {} as { [key: string]: string };
    Deno.args.forEach((argument) => {
      const argumentAsArray = argument.split("=");
      if (argumentAsArray.length !== 2) {
        return;
      }
      args[argumentAsArray[0]] = argumentAsArray[1];
    });

    const year = args["year"];
    const day = args["day"];

    if (!year || !day) {
      throw new Error(ERRORS.NOARGS);
    }

    const dirname = new URL(".", import.meta.url).pathname;
    const folder = `${dirname}${year}/${day}/`;
    const file = `${folder}index.ts`;
    const { firstProblem, secondProblem, lineParser, shouldRunProd } =
      await import(file);

    if (!firstProblem) {
      throw new Error(
        "☠ No first problem provided. Eg. export { firstProblem }"
      );
    }
    if (!lineParser) {
      throw new Error("☠ No line parser provided. Eg. export { lineParser }");
    }
    if (!secondProblem) {
      console.warn(
        "⚠ No second problem provided. Eg. export { secondProblem }"
      );
    }

    const solver = new ProblemSolver(
      folder,
      lineParser,
      firstProblem,
      secondProblem
    );

    solver.test();
    if (shouldRunProd) {
      solver.solve();
    }
  } else {
    throw new Error(ERRORS.NOARGS);
  }
} catch (e) {
  console.error(e);
  Deno.exit(0);
}
