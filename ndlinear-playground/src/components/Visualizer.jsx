import { useState } from "react";
import { postTrain } from "../api";
import TrainChart from "./TrainChart";

export default function Visualizer({ config }) {
  const [losses, setLosses] = useState([]);
  const [loading, setLoading] = useState(false);

  const runComparison = async () => {
    setLoading(true);

    const configs = [
      { ...config, layerType: "Linear" },
      { ...config, layerType: "NdLinear" },
    ];

    const results = [];
    for (let cfg of configs) {
      const res = await postTrain(cfg);
      results.push({
        label: cfg.layerType,
        data: res.loss_history,
      });
    }

    setLosses(results);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6">
        📊 Compare Linear vs NdLinear
      </h3>

      <button
        onClick={runComparison}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        disabled={loading}
      >
        {loading ? "Training..." : "🏋️ Compare Training"}
      </button>

      {losses.length > 0 && <TrainChart datasets={losses} />}
    </div>
  );
}
