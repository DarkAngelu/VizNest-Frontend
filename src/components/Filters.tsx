import React from "react";

interface FiltersProps {
	ageFilter: string;
	genderFilter: string;
	onFilterChange: (filterType: "age" | "gender", value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
	ageFilter,
	genderFilter,
	onFilterChange,
}) => {
	return (
		<div className="filters">
			<div className="filter-group">
				<label htmlFor="age-filter">Age:</label>
				<select
					id="age-filter"
					value={ageFilter}
					onChange={(e) => onFilterChange("age", e.target.value)}
				>
					<option value="all">All Ages</option>
                    <option value="15-25">15-25</option>
                    <option value=">25">&gt;25</option>
				</select>
			</div>
			<div className="filter-group">
				<label htmlFor="gender-filter">Gender:</label>
				<select
					id="gender-filter"
					value={genderFilter}
					onChange={(e) => onFilterChange("gender", e.target.value)}
				>
					<option value="all">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
				</select>
			</div>
		</div>
	);
};

export default Filters;
