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
        params: res.param_count,
      });
    }

    setLosses(results);
    setLoading(false);
  };

  const inputShape = `[${config.batchSize}, ${config.inputDims}]`;
  const outputShape = `[${config.batchSize}, ${config.outputDims}]`;

  const linearParams = losses.find((l) => l.label === "Linear")?.params || 1;
  const ndParams = losses.find((l) => l.label === "NdLinear")?.params || 1;
  const savings = Math.round((1 - ndParams / linearParams) * 100);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4">
        📊 NdLinear vs nn.Linear Benchmark
      </h3>

      {/* Configuration Summary */}
      <div className="mb-6 text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
        <p>
          <strong>Input Shape:</strong> {inputShape}
        </p>
        <p>
          <strong>Output Shape:</strong> {outputShape}
        </p>
        <p>
          <strong>Batch Size:</strong> {config.batchSize}
        </p>

        {losses.length === 2 && (
          <div className="text-sm mt-4 text-gray-700 bg-white border border-gray-200 rounded-md p-3">
            <p>
              <b>nn.Linear Params:</b> {linearParams.toLocaleString()}
            </p>
            <p>
              <b>NdLinear Params:</b> {ndParams.toLocaleString()}
            </p>
            <p className="text-green-600 font-medium mt-1">
              🔻 NdLinear reduces parameter count by {savings}%.
            </p>
          </div>
        )}

        <p className="mt-4 text-gray-600">
          Both layers are trained on randomly generated inputs for 20 epochs
          using a binary classification task. This lets you visually compare
          loss behavior and convergence speed.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          onClick={runComparison}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Training..." : "🏋️ Run Comparison"}
        </button>
      </div>

      {/* Chart and Explanation */}
      {losses.length > 0 && (
        <>
          <TrainChart datasets={losses} />

          <div className="mt-6 text-sm text-gray-700">
            <p className="mb-2">
              <strong>Interpretation:</strong>
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                In this task, <strong>nn.Linear</strong> converges quickly due
                to its simplicity and full flattening of input features.{" "}
                <strong>NdLinear</strong>, while slower to converge, preserves
                the spatial structure of tensors — a feature that becomes
                valuable for structured input like images, patches, or
                sequences. This example shows that architecture choice must
                consider data modality and task complexity, not just training
                speed.
              </li>
              <li>
                <strong>NdLinear</strong> typically starts with more parameters
                but preserves multidimensional structure.
              </li>
              <li>
                <strong>nn.Linear</strong> flattens input, which may hurt
                performance on structured data.
              </li>
              <li>
                Compare the slope and shape of both curves to see training
                stability and convergence.
              </li>
              <li>
                This setup helps illustrate param efficiency, convergence
                trends, and task suitability.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
