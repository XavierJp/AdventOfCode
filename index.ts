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
    const path = `${dirname}${year}/${day}/index.ts`;

    const script = Deno.run({
      cmd: ["deno", "run", "--allow-read", path],
    });
    await script.status();
  } else {
    throw new Error(ERRORS.NOARGS);
  }
} catch (e) {
  console.error(e);
  Deno.exit(0);
}
