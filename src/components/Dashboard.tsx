import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateRangePicker from "./DateRangePicker";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Filters from "./Filters";
import { fetchData, DataPoint } from "../api/dataApi";

const Dashboard: React.FC = () => {
	const [data, setData] = useState<DataPoint[]>([]);
	const [dateRange, setDateRange] = useState<[Date, Date]>([
		new Date("2022-04-10"),
		new Date("2022-10-29"),
	]);
	const [ageFilter, setAgeFilter] = useState<string>("all");
	const [genderFilter, setGenderFilter] = useState<string>("all");
	const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
	const [shareUrl, setShareUrl] = useState<string>("");

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchDataFromApi = async () => {
			const fetchedData = await fetchData();
			setData(fetchedData);
		};

		fetchDataFromApi();
	}, []);

	const filteredData = useMemo(() => {
		return data.filter((point) => {
			const date = new Date(point.Day);
			const isInDateRange = date >= dateRange[0] && date <= dateRange[1];
			const matchesAge = ageFilter === "all" || point.Age === ageFilter;
			const matchesGender =
				genderFilter === "all" || point.Gender === genderFilter;
			return isInDateRange && matchesAge && matchesGender;
		});
	}, [data, dateRange, ageFilter, genderFilter]);

	const updateURLAndShareLink = useCallback(() => {
		const params = new URLSearchParams();
		params.set("startDate", dateRange[0].toISOString().split("T")[0]);
		params.set("endDate", dateRange[1].toISOString().split("T")[0]);
		params.set("age", ageFilter);
		params.set("gender", genderFilter);
		if (selectedFeature) params.set("feature", selectedFeature);

		navigate({ search: params.toString() }, { replace: true });
		setShareUrl(
			`${window.location.origin}${
				window.location.pathname
			}?${params.toString()}`
		);
	}, [dateRange, ageFilter, genderFilter, selectedFeature, navigate]);

	useEffect(() => {
		updateURLAndShareLink();
	}, [updateURLAndShareLink]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const startDate = params.get("startDate");
		const endDate = params.get("endDate");
		const age = params.get("age");
		const gender = params.get("gender");
		const feature = params.get("feature");

		if (startDate && endDate) {
			setDateRange([new Date(startDate), new Date(endDate)]);
		}
		if (age) setAgeFilter(age);
		if (gender) setGenderFilter(gender);
		if (feature) setSelectedFeature(feature);
	}, [location.search]);

	const handleDateRangeChange = (newDateRange: [Date, Date]) => {
		setDateRange(newDateRange);
	};

	const handleFilterChange = (
		filterType: "age" | "gender",
		value: string
	) => {
		if (filterType === "age") setAgeFilter(value);
		else setGenderFilter(value);
	};

	const handleFeatureClick = (feature: string) => {
		setSelectedFeature(feature);
	};

	const handleLogout = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

		try {
			await fetch(`${backendUrl}/api/logout`, {
				method: "POST",
				credentials: "include",
			});
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const handleShare = () => {
		navigator.clipboard.writeText(shareUrl).then(() => {
			alert("Share URL copied to clipboard!");
		});
	};

	return (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1>Interactive Data Visualization Dashboard</h1>
				<div className="dashboard-header-buttons">
					<button onClick={handleShare} className="share-btn">
						Share
					</button>
					<button onClick={handleLogout} className="logout-btn">
						Logout
					</button>
				</div>
			</div>
			<div className="filters-container">
				<h2>Filter Options</h2>
				<div className="filters-options">
					<DateRangePicker
						dateRange={dateRange}
						onChange={handleDateRangeChange}
					/>
					<Filters
						ageFilter={ageFilter}
						genderFilter={genderFilter}
						onFilterChange={handleFilterChange}
					/>
				</div>
			</div>
			<div className="chart-container">
				<BarChart
					data={filteredData}
					onFeatureClick={handleFeatureClick}
				/>
			</div>
			{selectedFeature && (
				<div className="chart-container">
					<LineChart data={filteredData} feature={selectedFeature} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
