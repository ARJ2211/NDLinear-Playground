export default function Visualizer({ config }) {
  const { batchSize, inputDims, outputDims, layerType } = config;

  const inputShape = [batchSize, ...inputDims.split(",").map(Number)];
  const outputShape = [batchSize, ...outputDims.split(",").map(Number)];

  const paramCount = (() => {
    const inDims = inputDims.split(",").map(Number);
    const outDims = outputDims.split(",").map(Number);

    if (layerType === "Linear") {
      const inputSize = inDims.reduce((a, b) => a * b, 1);
      const outputSize = outDims.reduce((a, b) => a * b, 1);
      return inputSize * outputSize;
    } else {
      return inDims.reduce((sum, d, i) => sum + d * outDims[i], 0);
    }
  })();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6">📊 Layer Summary</h3>
      <ul className="space-y-3 text-gray-700 text-lg">
        <li>
          <span className="font-medium">Layer Type:</span> {layerType}
        </li>
        <li>
          <span className="font-medium">Input Shape:</span> [
          {inputShape.join(", ")}]
        </li>
        <li>
          <span className="font-medium">Output Shape:</span> [
          {outputShape.join(", ")}]
        </li>
        <li>
          <span className="font-medium">Parameter Count:</span>{" "}
          {paramCount.toLocaleString()}
        </li>
      </ul>
    </div>
  );
}
