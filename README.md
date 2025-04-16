# NdLinear Playground 🔬

A local playground web app for experimenting with [`NdLinear`](https://github.com/ensemble-core/NdLinear) vs. `nn.Linear` layers in PyTorch. It allows users to visually compare:

- Parameter efficiency
- Training convergence
- Output behavior across layers
- Real tensor transformations

This project is intended as a companion to the NdLinear paper:  
**"NdLinear Is All You Need for Representation Learning"** (Reneau et al., 2025)

---

## 🧠 What is NdLinear?

NdLinear is a novel drop-in alternative to traditional `nn.Linear` layers. Instead of flattening the input, NdLinear applies mode-wise linear transformations across each input dimension:

For an input tensor `X ∈ R^{B × D1 × D2 × ... × Dn}`, NdLinear maps:

```
X → Y ∈ R^{B × H1 × H2 × ... × Hn}
```

via:

```
Y = X ×₁ W₁ ×₂ W₂ ... ×ₙ Wₙ
```

This improves both **parameter efficiency** and **representational power** by preserving cross-dimensional structure.

---

## 🚀 Features

- Compare `nn.Linear` and `NdLinear` side-by-side.
- Visualize:
  - Training curves (loss vs. epochs)
  - Output shape and parameter count
  - Real forward-pass tensor projections
- Train models directly in-browser (runs locally on user's device).
- Multiple preset configurations (MLP / Transformer-style / Custom).

---

## 📁 Folder Structure

```
NDLinear-PLAYGROUND/
├── ndlinear-playground/       # React frontend
├── ndlinear-backend/          # FastAPI backend with PyTorch
└── README.md
```

---

## ⚙️ Configurations

The playground supports the following config keys:

| Config Name  | Description                                        | Example |
| ------------ | -------------------------------------------------- | ------- |
| `inputDims`  | Number of features per input sample                | `128`   |
| `outputDims` | Output dimension after linear transformation       | `64`    |
| `batchSize`  | Batch size used for each forward pass              | `16`    |
| `epochs`     | Number of epochs for training                      | `20`    |
| `layerType`  | `"Linear"` or `"NdLinear"` (autofilled internally) | -       |
| `preset`     | Optional: `"mlp"`, `"transformer"`, or `"custom"`  | `"mlp"` |

---

## 🛠️ How to Run

### Step 1: Clone this repo

```bash
git clone https://github.com/ARJ2211/ndlinear-playground.git
cd ndlinear-playground
```

### Step 2: Start the backend (FastAPI)

```bash
cd ../ndlinear-backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will be running at: `http://localhost:8000`

### Step 3: Start the frontend (React)

```bash
cd ../ndlinear-playground
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🎛️ Presets

You can quickly switch between presets from the UI or modify config manually:

- **MLP Preset**:

  ```json
  {
    "preset": "mlp",
    "inputDims": 128,
    "outputDims": 64,
    "batchSize": 16,
    "epochs": 20
  }
  ```

- **Transformer Preset**:

  ```json
  {
    "preset": "transformer",
    "inputDims": 512,
    "outputDims": 512,
    "batchSize": 8,
    "epochs": 20
  }
  ```

- **Custom Preset**:
  Modify values directly in the UI.

---

## 📈 Why this matters

The paper demonstrates that NdLinear achieves:

- Better accuracy with fewer parameters
- Faster convergence in various settings (CNNs, RNNs, ViTs, Transformers)
- Seamless integration into large-scale foundation models

This playground brings those comparisons to life — right in your browser.

---

## 📣 Citation

If you use NdLinear, please cite:

```
@article{reneau2025ndlinear,
  title={NdLinear Is All You Need for Representation Learning},
  author={Reneau, Alex and Hu, Jerry Yao-Chieh and Zhuang, Zhongfang and Liu, Ting-Chun},
  journal={arXiv preprint arXiv:2503.17353},
  year={2025}
}
```

---

## 🧠 Credits

Built by [Aayush Jadhav](https://github.com/ARJ2211).

Inspired by the amazing work by Ensemble AI.  
Repo: https://github.com/ensemble-core/NdLinear
