# tailwindcss-spring

A Tailwind CSS plugin that adds spring animations to your project using CSS linear().
Define just two parameters and let the plugin generate the easing curve and the animation duration.

Check out the the plugin in action on [this website](https://tailwindcss-spring.kvin.me/).

## Parameters

- `spring-bounce-*`
- `spring-duration-*`

Example:

```html
<div class="spring-bounce-60 spring-duration-300 transition-transform hover:scale-150"
```

## Installation

Install the plugin via npm:

```bash
npm install tailwindcss-spring
```

Then, add the plugin to your `tailwind.config.js` file:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("tailwindcss-spring"),
    // ...
  ],
};
```

## Usage

### `spring-bounce-*`

This class defines the bounce (as a percentage), generates the easing curve, and applies it to the `transition-timing-function`.

- I recommend using low bounce values for most animations unless you want a springy effect.

### `spring-duration-*`

This class defines the perceptual duration of the animation in milliseconds.

- The perceptual duration allows you to intuitively configure the animation, focusing on the most significant part of the motion.

- Since spring easings often have long settling periods, the perceptual duration isn't used as the actual animation duration. Instead, the real duration is calculated based on the `spring-bounce-*` value.

## More Info

This plugin was created by [Kevin Grajeda](https://x.com/k_grajeda). It's open source and available on [GitHub](https://github.com/KevinGrajeda/tailwindcss-spring).

You can also check out my [CSS spring easing generator](https://www.kvin.me/css-springs).

A special thanks to [Jake Archibald](https://x.com/jaffathecake) for his work on the [linear easing generator](https://linear-easing-generator.netlify.app/). I used some of [his](https://github.com/jakearchibald/linear-easing-generator) code for spring calculations.
