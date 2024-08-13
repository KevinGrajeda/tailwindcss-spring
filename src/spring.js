export function generateEase(bounce) {
  const perceptualDuration = 1000;

  const stiffness = ((2 * Math.PI) / (perceptualDuration / 1000)) ** 2;

  const damping =
    ((1 - bounce / 100) * 4 * Math.PI) / (perceptualDuration / 1000);

  const springSolver = createSpringSolver({
    mass: 1,
    stiffness,
    damping,
    velocity: 0,
  });
  const settlingDuration = calculateSettlingDuration(
    springSolver,
    perceptualDuration
  );

  const springValues = generateSpringValues(springSolver, settlingDuration);
  return {
    ease: generateLinearSyntax(
      normalizeTime(springValues, settlingDuration),
      4
    ),
    durationMultiplier: (settlingDuration / perceptualDuration) * 1000,
  };
}

/**
 * This code uses components from the linear-easing-generator by Jake Archibald.
 * Original source: https://github.com/jakearchibald/linear-easing-generator
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
export function calculateSettlingDuration(solver, perceptualDuration) {
  const step = 1 / 8;
  let time = (perceptualDuration * 1.66) / 1000;

  while (true) {
    if (Math.abs(1 - solver(time)) < 0.001) {
      const restStart = time;
      let restSteps = 1;
      while (true) {
        time += step;
        if (Math.abs(1 - solver(time)) >= 0.0005) break;
        restSteps++;
        if (restSteps === 20) return restStart;
      }
    }
    time += step;
    if (time > 30) return 30;
  }
}

export function createSpringSolver({ mass, stiffness, damping, velocity }) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  const b = zeta < 1 ? (zeta * w0 - velocity) / wd : -velocity + w0;

  function solver(t) {
    let displacement;

    if (zeta < 1) {
      displacement =
        Math.exp(-t * zeta * w0) * (Math.cos(wd * t) + b * Math.sin(wd * t));
    } else {
      displacement = (1 + b * t) * Math.exp(-t * w0);
    }

    return 1 - displacement;
  }

  return solver;
}

export function generateSpringValues(springSolver, settlingDuration) {
  const samples = settlingDuration * 500;
  let values = [];

  for (let i = 0; i <= settlingDuration; i += 1 / samples) {
    values.push([i, springSolver(i)]);
  }
  values = simplifyDouglasPeucker(values, 0.001);

  return values;
}

export function normalizeTime(points, settlingDuration) {
  // Normalize time to 0-1
  return points.map(([time, value]) => [time / settlingDuration, value]);
}

export function generateLinearSyntax(points, round) {
  const xFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: Math.max(round - 2, 0),
  });
  const yFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: round,
  });

  const valuesWithRedundantX = new Set();
  const maxDelta = 1 / 10 ** round;

  // Figure out entries that don't need an explicit position value
  for (let i = 0; i < points.length; i++) {
    const [x] = points[i];
    // If the first item's position is 0, then we don't need to state the position
    if (i === 0) {
      if (x === 0) valuesWithRedundantX.add(points[i]);
      continue;
    }
    // If the last entry's position is 1, and the item before it is less than 1, then we don't need to state the position
    if (i === points.length - 1) {
      const previous = points[i - 1][0];
      if (x === 1 && previous <= 1) valuesWithRedundantX.add(points[i]);
      continue;
    }

    // If the position is the average of the previous and next positions, then we don't need to state the position
    const previous = points[i - 1][0];
    const next = points[i + 1][0];

    const averagePos = (next - previous) / 2 + previous;
    const delta = Math.abs(x - averagePos);

    if (delta < maxDelta) valuesWithRedundantX.add(points[i]);
  }

  // Group into sections with same y
  const groupedValues = [[points[0]]];

  for (const value of points.slice(1)) {
    if (value[1] === groupedValues.at(-1)[0][1]) {
      groupedValues.at(-1).push(value);
    } else {
      groupedValues.push([value]);
    }
  }

  const outputValues = groupedValues.map((group) => {
    const yValue = yFormat.format(group[0][1]);

    const regularValue = group
      .map((value) => {
        const [x] = value;
        let output = yValue;

        if (!valuesWithRedundantX.has(value)) {
          output += " " + xFormat.format(x * 100) + "%";
        }

        return output;
      })
      .join(", ");

    if (group.length === 1) return regularValue;

    // Maybe it's shorter to provide a value that skips steps?
    const xVals = [group[0][0], group.at(-1)[0]];
    const positionalValues = xVals
      .map((x) => xFormat.format(x * 100) + "%")
      .join(" ");

    const skipValue = `${yValue} ${positionalValues}`;

    return skipValue.length > regularValue.length ? regularValue : skipValue;
  });
  return `linear(${outputValues.join(", ")})`;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
  let x = p1[0];
  let y = p1[1];
  let dx = p2[0] - x;
  let dy = p2[1] - y;

  if (dx !== 0 || dy !== 0) {
    var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = p[0] - x;
  dy = p[1] - y;

  return dx * dx + dy * dy;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index;

  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);

    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (maxSqDist > sqTolerance) {
    if (index - first > 1) {
      simplifyDPStep(points, first, index, sqTolerance, simplified);
    }

    simplified.push(points[index]);

    if (last - index > 1) {
      simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
  }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, tolerance) {
  if (points.length <= 1) return points;
  const sqTolerance = tolerance * tolerance;
  const last = points.length - 1;
  const simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);

  return simplified;
}
