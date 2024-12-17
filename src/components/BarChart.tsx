import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { DataPoint } from "../api/dataApi";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface BarChartProps {
	data: DataPoint[];
	onFeatureClick: (feature: string) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, onFeatureClick }) => {
	const features = ["A", "B", "C", "D", "E", "F"];
	const totalTimeSpent = features.map((feature) =>
		data.reduce((sum, point) => sum + (point[feature] as number), 0)
	);

	const chartData = {
		labels: features,
		datasets: [
			{
				label: "Total Time Spent",
				data: totalTimeSpent,
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			},
		],
	};

	const options: ChartOptions<"bar"> = {
		indexAxis: "y" as const,
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Feature Usage",
				font: {
					size: 18,
					weight: "bold",
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Total Time Spent",
					font: {
						size: 14,
						weight: "bold",
					},
				},
				ticks: {
					font: {
						weight: "bold",
					},
				},
			},
			y: {
				title: {
					display: true,
					text: "Features",
					font: {
						size: 14,
						weight: "bold",
					},
				},
				ticks: {
					font: {
						weight: "bold",
					},
				},
			},
		},
		onClick: (_event: any, elements: any[]) => {
			if (elements.length > 0) {
				const index = elements[0].index;
				onFeatureClick(features[index]);
			}
		},
	};

	return (
		<div style={{ height: "400px" }}>
			<Bar data={chartData} options={options} />
		</div>
	);
};

export default BarChart;
