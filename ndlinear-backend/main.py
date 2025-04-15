from fastapi import FastAPI
from pydantic import BaseModel
from model import get_layer, run_forward, run_training

app = FastAPI()

class LayerConfig(BaseModel):
    layer_type: str        # "Linear" or "NdLinear"
    input_dims: list[int]
    output_dims: list[int]
    batch_size: int

@app.get("/health")
def health():
    return {"status": "running"}

@app.post("/forward")
def forward(cfg: LayerConfig):
    output_shape, param_count = run_forward(cfg)
    return {
        "output_shape": output_shape,
        "parameter_count": param_count
    }

@app.post("/train")
def train(cfg: LayerConfig):
    return run_training(cfg)
