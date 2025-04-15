import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function TrainChart({ datasets }) {
  const colors = ["rgb(99, 102, 241)", "rgb(16, 185, 129)"];

  const data = {
    labels: datasets[0].data.map((_, i) => `Epoch ${i + 1}`),
    datasets: datasets.map((d, idx) => ({
      label: d.label,
      data: d.data,
      borderColor: colors[idx % colors.length],
      backgroundColor: `${colors[idx % colors.length]}44`,
      tension: 0.3,
    })),
  };

  return (
    <div
      className="p-4 bg-white rounded-lg shadow mt-8"
      style={{ height: "300px" }}
    >
      <h3 className="text-lg font-bold mb-2">
        📉 Training Loss: Linear vs NdLinear
      </h3>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        height={250}
      />
    </div>
  );
}
