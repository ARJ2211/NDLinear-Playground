export default function Hero() {
  return (
    <section className="bg-white py-10 px-6 border-b border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-3">🧠 Parametric Playground</h1>
        <p className="text-lg text-gray-600 mb-5">
          Compare <code>nn.Linear</code> and <code>NdLinear</code> in real-time.
          This tool demonstrates the work from the paper{" "}
          <a
            className="text-indigo-600 underline"
            href="https://github.com/ensemble-core/NdLinear"
            target="_blank"
            rel="noopener noreferrer"
          >
            “NdLinear: Multi-Dimensional Linear Transformation for Deep
            Learning”
          </a>
          , which proposes a parameter-efficient alternative to traditional
          dense layers.
        </p>
      </div>
    </section>
  );
}
