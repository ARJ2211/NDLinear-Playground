from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import get_layer, run_forward, run_training

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    output_shape, param_count, sample = run_forward(cfg)
    return {
        "output_shape": output_shape,
        "parameter_count": param_count,
        "sample_output": sample
    }


@app.post("/train")
def train(cfg: LayerConfig):
    return run_training(cfg)
