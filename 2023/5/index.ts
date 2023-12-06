const firstProblem = (input: string[]) => {
  const maps = [] as string[][];
  let currentMapping = [] as string[];

  let seeds = [] as number[];

  for (const line of input) {
    if (line.indexOf("seeds: ") === 0) {
      seeds = line
        .replace("seeds: ", "")
        .split(" ")
        .map((e) => parseInt(e, 10));
      continue;
    }
    if (!line) {
      continue;
    }
    if (line.indexOf(" map") > -1) {
      if (currentMapping.length > 0) {
        maps.push(currentMapping);
      }
      currentMapping = [];
    } else {
      currentMapping.push(line);
    }
  }
  maps.push(currentMapping);

  const locations = seeds.map((seed) => {
    let currentSeed = seed;
    maps.forEach((mappings) => {
      let hasMapped = false;
      mappings.forEach((mapping) => {
        const [to, from, range] = mapping
          .split(" ")
          .map((e) => parseInt(e, 10));

        if (!hasMapped && currentSeed >= from && currentSeed < from + range) {
          currentSeed = to + currentSeed - from;
          hasMapped = true;
        }
      });
    });
    return currentSeed;
  });
  return Math.min(...locations);
};

const secondProblem = (input: string[]) => {
  const maps = [] as any[][][];
  let currentMapping = [] as any[][];

  let seeds = [] as number[][];

  for (const line of input) {
    if (line.indexOf("seeds: ") === 0) {
      const seedsTmp = line
        .replace("seeds: ", "")
        .split(" ")
        .map((e) => parseInt(e, 10));

      for (let i = 0; i < seedsTmp.length; i += 2) {
        seeds.push([seedsTmp[i], seedsTmp[i] + seedsTmp[i + 1]]);
      }
      continue;
    }
    if (!line) {
      continue;
    }
    if (line.indexOf(" map") > -1) {
      if (currentMapping.length > 0) {
        maps.push(currentMapping);
      }
      currentMapping = [];
    } else {
      currentMapping.push(line.split(" ").map((e) => parseInt(e, 10)));
    }
  }
  maps.push(currentMapping);

  const getLoc = (i: number) => {
    let currentSeed = i;
    for (let u = 0; u < maps.length; u++) {
      const mappings = maps[u];

      let w = 0;
      while (w < mappings.length) {
        //[to, from, range];
        const mapper = mappings[w];
        const t = currentSeed - mapper[1];

        if (t >= 0 && t < mapper[2]) {
          currentSeed = mapper[0] + t;
          w = mappings.length;
        }

        w += 1;
      }
    }
    return currentSeed;
  };

  let minimum = Infinity;

  for (let [from, to] of seeds) {
    console.time("*");
    for (let i = from; i < to; i++) {
      minimum = Math.min(minimum, getLoc(i));
    }
    console.timeEnd("*");
  }
  return minimum;
};

const lineParser = (line: string) => line;

const shouldRunProd = true;

export { firstProblem, secondProblem, lineParser, shouldRunProd };
