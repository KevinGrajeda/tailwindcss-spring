import SpringEditor from "./SpringEditor";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-10 py-14 sm:py-28">
      <h1 className="text-2xl font-bold tracking-tight">tailwindcss-spring</h1>
      <p className="mt-4">
        A Tailwind CSS plugin that adds spring animations to your project.
      </p>
      <p className="mt-4">
        Define just two parameters and let the plugin do the rest.
      </p>
      <SpringEditor />
      <h2 className="mt-8 text-xl font-bold tracking-tight">Installation</h2>
      <p className="mt-4">Install the plugin</p>
      <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4">
        <code>npm install tailwindcss-spring</code>
      </pre>
      <p className="mt-4">
        Then add the plugin to your tailwind.config.js file:
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4">
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
    </main>
  );
}
