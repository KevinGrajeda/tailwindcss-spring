import createPlugin from "tailwindcss/plugin";
import theme from "./theme";
import { generateEase } from "./spring";

/** @type {import('tailwindcss/types/config').PluginCreator} */
const pluginCreator = (api) => {
  api.matchUtilities(
    {
      "spring-bounce": (value) => {
        const { durationMultiplier, ease } = generateEase(value);
        return {
          transitionTimingFunction: ease,
          "--tw-ease-duration-multiplier": `${durationMultiplier}`,
        };
      },
    },
    { values: api.theme("bounceValues") }
  );
  api.matchUtilities(
    {
      "spring-duration": (value) => {
        return {
          transitionDuration: `calc(var(--tw-ease-duration-multiplier) * ${value}ms)`,
        };
      },
    },
    {
      values: api.theme("perceptualDurationValues"),
    }
  );
};

/** @type {import('tailwindcss/types/config').Config}*/
const pluginConfig = {
  theme,
};

export default createPlugin(pluginCreator, pluginConfig);
