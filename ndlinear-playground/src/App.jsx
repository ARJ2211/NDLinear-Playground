import { useState } from "react";
import Hero from "./components/Hero";
import ConfigPanel from "./components/ConfigPanel";
import Visualizer from "./components/Visualizer";

export default function App() {
  const [config, setConfig] = useState({
    layerType: "Linear",
    batchSize: 32,
    inputDims: "16,16,3",
    outputDims: "32,32,8",
    inputMode: "random",
    preset: "custom",
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Hero />
      <section id="playground" className="px-4 py-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          🧠 NdLinear Playground
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ConfigPanel config={config} setConfig={setConfig} />
          <Visualizer config={config} />
        </div>
      </section>
    </main>
  );
}
