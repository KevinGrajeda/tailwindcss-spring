import { it, describe, expect } from "vitest";
import { generatePluginCSS } from "./utils";

describe("tailwind-spring", () => {
  it("generates correct easing curve", async () => {
    const css = await generatePluginCSS({
      content: '<div class="spring-bounce-0">Hello</div>',
    });

    expect(css).toMatch(
      ".spring-bounce-0{transition-timing-function:linear(0, 0.001 0.44%, 0.0045 0.94%, 0.0195 2.03%, 0.0446 3.19%, 0.0811 4.5%, 0.1598 6.82%, 0.3685 12.34%, 0.4693 15.17%, 0.5663, 0.6498 21.27%, 0.7215 24.39%, 0.7532 25.98%, 0.7829 27.65%, 0.8105, 0.8349 31.14%, 0.8573 32.95%, 0.8776 34.84%, 0.8964 36.87%, 0.9136 39.05%, 0.929 41.37%, 0.9421 43.77%, 0.9537 46.38%, 0.9636 49.14%, 0.9789 55.31%, 0.9888 62.35%, 0.9949 71.06%, 0.9982 82.52%, 0.9997 99.94%);--tw-ease-duration-multiplier:1.66}"
    );
  });

  it("generates correct arbitrary easing curve", async () => {
    const css = await generatePluginCSS({
      content: '<div class="spring-bounce-[77]">Hello</div>',
    });
    expect(css).toMatch(
      ".spring-bounce-\\[77\\]{transition-timing-function:linear(0, 0.0032, 0.0127, 0.0288, 0.0508, 0.0793, 0.1153 1.52%, 0.2063 2.08%, 0.2995 2.56%, 0.4145 3.09%, 0.8473 4.9%, 1.0091, 1.1523 6.33%, 1.2651 6.99%, 1.3121, 1.3534, 1.3881, 1.4169, 1.44, 1.4573, 1.4689, 1.475 9.53%, 1.4758, 1.4733, 1.4673, 1.458, 1.4452, 1.4289 11.12%, 1.3848 11.71%, 1.3401 12.21%, 1.283 12.77%, 1.0708 14.64%, 0.9925, 0.9241 16.09%, 0.87 16.76%, 0.83, 0.8009 18%, 0.7905, 0.7825, 0.777, 0.774 19.23%, 0.7746, 0.7818 20.28%, 0.7955 20.83%, 0.8164 21.42%, 0.8379 21.93%, 0.8651 22.48%, 0.9665 24.37%, 1.0037, 1.0362 25.81%, 1.062 26.49%, 1.0808, 1.0945, 1.1034, 1.1075 28.94%, 1.1073 29.45%, 1.104 29.99%, 1.0974 30.55%, 1.0875 31.14%, 1.0642 32.21%, 0.9982 34.82%, 0.9827 35.54%, 0.9706 36.2%, 0.9617, 0.9552, 0.9509, 0.9489 38.62%, 0.9504 39.68%, 0.9582 40.84%, 0.9693 41.92%, 1.0009 44.55%, 1.014 45.93%, 1.0213, 1.0243 48.3%, 1.0239 49.24%, 1.0212 50.24%, 0.995 55.23%, 0.9904 56.61%, 0.9885 57.96%, 0.9899 59.95%, 1.0023 64.92%, 1.0055 67.63%, 1.0048 69.7%, 0.999 74.57%, 0.9974 77.17%, 1.0012 86.83%, 0.9996 100%);--tw-ease-duration-multiplier:5.285}"
    );
  });

  it("generates correct duration", async () => {
    const css = await generatePluginCSS({
      content: '<div class="spring-duration-100">Hello</div>',
    });

    expect(css).toMatch(
      ".spring-duration-100{transition-duration:calc(var(--tw-ease-duration-multiplier) * 100ms)}"
    );
  });

  it("generates correct arbitrary duration", async () => {
    const css = await generatePluginCSS({
      content: '<div class="spring-duration-[77]">Hello</div>',
    });

    expect(css).toMatch(
      ".spring-duration-\\[77\\]{transition-duration:calc(var(--tw-ease-duration-multiplier) * 77ms)}"
    );
  });
});
