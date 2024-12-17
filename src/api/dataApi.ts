import Papa from "papaparse";

export interface DataPoint {
	Day: string;
	Age: string;
	Gender: string;
	A: number;
	B: number;
	C: number;
	D: number;
	E: number;
	F: number;
	[key: string]: string | number;
}

export const fetchData = async (): Promise<DataPoint[]> => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const response = await fetch(`${backendUrl}/api/data`);
	const csvText = await response.text();

	return new Promise((resolve, reject) => {
		Papa.parse(csvText, {
			header: true,
			complete: (results) => {
				const data = results.data as DataPoint[];
				resolve(data);
			},
			error: (error: any) => {
				reject(error);
			},
			dynamicTyping: true,
		});
	});
};
