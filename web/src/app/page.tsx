import CopyButton from "@/components/CopyButton";
import SpringEditor from "./SpringEditor";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-10 py-14 sm:py-28">
      <div className="flex">
        <h1 className="mr-3 text-2xl font-bold tracking-tight">
          tailwindcss-spring
        </h1>
        <div className="rotate-45">
          <button className="origin-bottom transition-transform spring-bounce-70 spring-duration-150 hover:scale-y-110 active:scale-y-90">
            <svg
              className="size-8 stroke-red-500"
              width="250"
              height="250"
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M110.616 105.366C159.982 105.366 200 84.0175 200 57.6829C200 31.3484 159.982 10 110.616 10"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M109.589 172.683C159.522 172.683 200 151.335 200 125C200 98.6655 159.522 77.3171 109.589 77.3171"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M109.589 240C159.522 240 200 218.652 200 192.317C200 165.983 159.522 144.634 109.589 144.634"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M110.616 172.683C77.1389 172.683 50 166.404 50 158.659C50 150.913 77.1389 144.634 110.616 144.634"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M110.616 240C77.1389 240 50 233.721 50 225.976C50 218.23 77.1389 211.951 110.616 211.951"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M110.616 105.366C77.1389 105.366 50 99.0869 50 91.3415C50 83.596 77.1389 77.3171 110.616 77.3171"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M110.616 38.0488C77.1389 38.0488 50 31.7698 50 24.0244C50 16.2789 77.1389 10 110.616 10"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-4">
        A Tailwind CSS plugin that adds spring animations to your project.
      </p>
      <p>Define just two parameters and let the plugin do the rest.</p>
      <SpringEditor />
      <h2 className="mt-8 text-xl font-bold tracking-tight">Installation</h2>
      <p className="mt-4">Install the plugin</p>
      <pre className="mt-4 overflow-x-auto rounded bg-muted p-3">
        <CopyButton text={`npm install tailwindcss-spring`} />
        <code>npm install tailwindcss-spring</code>
      </pre>
      <p className="mt-4">
        Then add the plugin to your tailwind.config.js file:
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-muted p-3">
        <code>
          {`// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-spring'),
    // ...
  ],
}`}
        </code>
      </pre>
      <h2 className="mt-8 text-xl font-bold tracking-tight">Usage</h2>
      <h3 className="mt-4 text-lg font-semibold">spring-bounce-*</h3>
      <p className="mt-4">
        This class defines the bounce (as a percentage), generates the easing
        curve, and applies it to the transition-timing-function.
      </p>
      <p className="mt-4">
        I recommend using low bounce values for most animations unless you want
        a springy effect.
      </p>
      <h3 className="mt-4 text-lg font-semibold">spring-duration-*</h3>
      <p className="mt-4">
        This class defines the perceptual duration of the animation in
        milliseconds.
      </p>
      <p className="mt-4">
        The perceptual duration allows you to intuitively configure the
        animation, focusing on the most significant part of the motion.
      </p>
      <p className="mt-4">
        Since spring easings often have long settling periods, the perceptual
        duration isn{"'"}t used as the actual animation duration. Instead, the
        real duration is calculated based on the spring-bounce-* value.
      </p>
      <h2 className="mt-8 text-xl font-bold tracking-tight">More info</h2>
      <p className="mt-4">
        This plugin was created by{" "}
        <a href="https://x.com/k_grajeda" className="underline">
          Kevin Grajeda
        </a>
        . It{"'"}s open source, available on{" "}
        <a
          href="github.com/kevingrajeda/tailwindcss-spring"
          className="underline"
        >
          GitHub
        </a>
        .
      </p>
      <p className="mt-4">
        You can also check out my{" "}
        <a href="https://www.kvin.me/css-springs" className="underline">
          CSS spring easing generator
        </a>
        .
      </p>
      <p className="mt-4">
        A special thanks to{" "}
        <a href="https://x.com/jaffathecake" className="underline">
          Jake Archibald{" "}
        </a>
        for his work on the{" "}
        <a
          href="https://linear-easing-generator.netlify.app/"
          className="underline"
        >
          linear easing generator
        </a>
        . I used some of{" "}
        <a
          href="https://github.com/jakearchibald/linear-easing-generator"
          className="underline"
        >
          his code
        </a>{" "}
        for spring calculations.
      </p>
    </main>
  );
}
