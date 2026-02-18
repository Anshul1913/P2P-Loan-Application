import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ScoreHistoryChart = ({ scoreHistory }) => {
  const data = {
    labels: scoreHistory.map((entry) => entry.month), // e.g., Jan, Feb, etc.
    datasets: [
      {
        label: "Credit Score",
        data: scoreHistory.map((entry) => entry.score),
        fill: false,
        tension: 0.4,
        borderColor: "#22c55e", // green
        pointBackgroundColor: "#22c55e",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Score History</h3>
        <select className="text-sm bg-gray-100 rounded px-2 py-1">
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <Line data={data} options={options} height={100} />
    </div>
  );
};

export default ScoreHistoryChart;
