import torch
import torch.nn as nn
from NdLinear.ndlinear import NdLinear

def get_layer(layer_type, in_dims, out_dims):
    if layer_type == "Linear":
        input_size = int(torch.prod(torch.tensor(in_dims)))
        output_size = int(torch.prod(torch.tensor(out_dims)))
        return nn.Linear(input_size, output_size)
    else:
        return NdLinear(in_dims, out_dims)

def run_forward(cfg):
    layer = get_layer(cfg.layer_type, cfg.input_dims, cfg.output_dims)
    batch = cfg.batch_size
    input_tensor = torch.randn([batch] + cfg.input_dims)
    input_flat = input_tensor.view(batch, -1) if cfg.layer_type == "Linear" else input_tensor
    output = layer(input_flat)
    param_count = sum(p.numel() for p in layer.parameters())
    sample = output[0].detach().cpu().numpy().tolist()  # first sample
    return list(output.shape), param_count, sample


def run_training(cfg):
    layer = get_layer(cfg.layer_type, cfg.input_dims, cfg.output_dims)
    batch = cfg.batch_size
    X = torch.randn([batch] + cfg.input_dims)
    y = torch.randint(0, 2, (batch,))

    if cfg.layer_type == "Linear":
        X = X.view(batch, -1)

    clf = nn.Sequential(
        layer,
        nn.Flatten() if cfg.layer_type == "NdLinear" else nn.Identity(),
        nn.Linear(int(torch.prod(torch.tensor(cfg.output_dims))), 2)
    )

    opt = torch.optim.Adam(clf.parameters(), lr=0.001)
    loss_fn = nn.CrossEntropyLoss()
    loss_vals = []

    for _ in range(5):
        opt.zero_grad()
        out = clf(X)
        loss = loss_fn(out, y)
        loss.backward()
        opt.step()
        loss_vals.append(float(loss.item()))

    return {"loss_history": loss_vals}
