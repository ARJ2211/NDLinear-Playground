// src/api.js

export async function postForward(config) {
  const payload = {
    layer_type: config.layerType,
    input_dims: config.inputDims.split(",").map(Number),
    output_dims: config.outputDims.split(",").map(Number),
    batch_size: config.batchSize,
  };

  const response = await fetch("http://localhost:8000/forward", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

export async function postTrain(config) {
  const payload = {
    layer_type: config.layerType,
    input_dims: config.inputDims.split(",").map(Number),
    output_dims: config.outputDims.split(",").map(Number),
    batch_size: config.batchSize,
  };

  const response = await fetch("http://localhost:8000/train", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await response.json();
}
