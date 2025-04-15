export default function ConfigPanel({ config, setConfig }) {
  const handleChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handlePresetChange = (e) => {
    const value = e.target.value;
    if (value === "imagePatch") {
      setConfig((prev) => ({
        ...prev,
        preset: value,
        inputDims: "16,16,3",
        outputDims: "32,32,8",
      }));
    } else if (value === "timeSeries") {
      setConfig((prev) => ({
        ...prev,
        preset: value,
        inputDims: "100,6",
        outputDims: "50,4",
      }));
    } else {
      handleChange("preset", value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6">🔧 Configure Layer</h3>

      <div className="grid gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Layer Type</span>
          <select
            className="mt-1 p-2 border rounded"
            value={config.layerType}
            onChange={(e) => handleChange("layerType", e.target.value)}
          >
            <option value="Linear">nn.Linear</option>
            <option value="NdLinear">NdLinear</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Batch Size</span>
          <input
            type="number"
            className="mt-1 p-2 border rounded"
            value={config.batchSize}
            onChange={(e) => handleChange("batchSize", Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Input Dimensions</span>
          <input
            type="text"
            className="mt-1 p-2 border rounded"
            value={config.inputDims}
            onChange={(e) => handleChange("inputDims", e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Output Dimensions</span>
          <input
            type="text"
            className="mt-1 p-2 border rounded"
            value={config.outputDims}
            onChange={(e) => handleChange("outputDims", e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Input Mode</span>
          <select
            className="mt-1 p-2 border rounded"
            value={config.inputMode}
            onChange={(e) => handleChange("inputMode", e.target.value)}
          >
            <option value="random">Random Tensor</option>
            <option value="custom">Manual Input</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Presets</span>
          <select
            className="mt-1 p-2 border rounded"
            value={config.preset}
            onChange={handlePresetChange}
          >
            <option value="custom">Custom</option>
            <option value="imagePatch">Image Patch</option>
            <option value="timeSeries">Time Series</option>
          </select>
        </label>
      </div>
    </div>
  );
}
