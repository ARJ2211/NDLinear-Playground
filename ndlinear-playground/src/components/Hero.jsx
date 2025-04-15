export default function Hero() {
  return (
    <section className="text-center py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Parametric Playground</h1>
      <p className="text-lg mb-8">
        Compare <code>nn.Linear</code> vs <code>NdLinear</code> in real-time
      </p>
      <a href="#playground">
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow hover:scale-105 transition">
          Get Started
        </button>
      </a>
    </section>
  );
}
