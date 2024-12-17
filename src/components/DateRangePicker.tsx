import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
	dateRange: [Date, Date];
	onChange: (dateRange: [Date, Date]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
	dateRange,
	onChange,
}) => {
    // Helper function to safely handle date change
	const handleStartDateChange = (date: Date | null) => {
		if (date) {
			onChange([date, dateRange[1]]);
		}
	};

	const handleEndDateChange = (date: Date | null) => {
		if (date) {
			onChange([dateRange[0], date]);
		}
	};

	const [startDate, endDate] = dateRange;

	return (
		<div className="date-range-picker">
			<div className="date-picker-wrapper">
				<label>From:</label>
				<DatePicker
					selected={startDate}
					onChange={handleStartDateChange}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
			</div>
			<div className="date-picker-wrapper">
				<label>To:</label>
				<DatePicker
					selected={endDate}
					onChange={handleEndDateChange}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
			</div>
		</div>
	);
};

export default DateRangePicker;
