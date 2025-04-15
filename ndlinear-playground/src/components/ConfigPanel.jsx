export default function ConfigPanel({ config, setConfig }) {
  const handleChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handlePresetChange = (e) => {
    const value = e.target.value;
    if (value === "imagePatch") {
      setConfig({
        ...config,
        preset: value,
        inputDims: "16,16,3",
        outputDims: "32,32,8",
      });
    } else if (value === "timeSeries") {
      setConfig({
        ...config,
        preset: value,
        inputDims: "100,6",
        outputDims: "50,4",
      });
    } else {
      handleChange("preset", value);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4">🛠️ Configure Layer</h3>

      <p className="text-gray-600 mb-6 text-sm">
        This configuration defines the input and output structure for both the{" "}
        <strong>nn.Linear</strong> and <strong>NdLinear</strong> layers. You can
        choose a preset to auto-fill the dimensions or define them manually.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <label className="block font-medium mb-1">📦 Batch Size</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={config.batchSize}
            onChange={(e) => handleChange("batchSize", Number(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Number of samples processed in one forward/backward pass.
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1">🔢 Input Dimensions</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={config.inputDims}
            onChange={(e) => handleChange("inputDims", e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated shape (e.g., <code>16,16,3</code>) before the layer.
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1">🎯 Output Dimensions</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={config.outputDims}
            onChange={(e) => handleChange("outputDims", e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated shape (e.g., <code>32,32,8</code>) after the layer.
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1">🧪 Input Mode</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={config.inputMode}
            onChange={(e) => handleChange("inputMode", e.target.value)}
          >
            <option value="random">Random Tensor</option>
            <option value="custom">Manual Input</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose to generate random inputs or upload your own (coming soon).
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">📚 Presets</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={config.preset}
            onChange={handlePresetChange}
          >
            <option value="custom">Custom</option>
            <option value="imagePatch">Image Patch (16×16×3 → 32×32×8)</option>
            <option value="timeSeries">Time Series (100×6 → 50×4)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select from common formats used in image and time series modeling.
          </p>
        </div>

        <div className="mt-2 text-xs text-gray-500 leading-relaxed">
          {config.preset === "imagePatch" && (
            <p>
              <strong>Image Patch:</strong> Expands spatial and channel
              dimensions — suitable for image-like tensors (e.g., 16×16×3 →
              32×32×8).
            </p>
          )}
          {config.preset === "timeSeries" && (
            <p>
              <strong>Time Series:</strong> Compresses multivariate sequential
              data — used in RNN/Transformer-based models (e.g., 100×6 → 50×4).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
