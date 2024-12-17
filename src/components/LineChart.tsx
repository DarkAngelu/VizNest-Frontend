import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { DataPoint } from "../api/dataApi";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	zoomPlugin
);

interface LineChartProps {
	data: DataPoint[];
	feature: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, feature }) => {
	const chartRef = useRef<ChartJS<"line"> | null>(null);

	const sortedData = [...data].sort(
		(a, b) => new Date(a.Day).getTime() - new Date(b.Day).getTime()
	);

	const chartData: ChartData<"line"> = {
		labels: sortedData.map((point) => point.Day),
		datasets: [
			{
				label: `Feature ${feature} Usage`,
				data: sortedData.map((point) => point[feature] as number),
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgba(75, 192, 192, 0.5)",
			},
		],
	};

	const options: ChartOptions<"line"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: `Feature ${feature} Usage Over Time`,
				font: {
					size: 18,
					weight: "bold",
				},
			},
			zoom: {
				pan: {
					enabled: true,
					mode: "xy" as const,
				},
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					mode: "xy" as const,
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Date",
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
					text: "Usage",
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
	};

	const handleResetZoom = () => {
		if (chartRef.current) {
			chartRef.current.resetZoom();
		}
	};

	return (
		<div className="line-chart-container">
			<div style={{ height: "400px" }}>
				<Line ref={chartRef} data={chartData} options={options} />
			</div>
			<div className="chart-controls">
				<button onClick={handleResetZoom} className="reset-zoom-btn">
					Reset Zoom
				</button>
				<div className="gesture-guide">
					<p>
						<strong>Zoom:</strong> Scroll up/down or pinch
					</p>
					<p>
						<strong>Pan:</strong> Click and drag
					</p>
				</div>
			</div>
		</div>
	);
};

export default LineChart;
