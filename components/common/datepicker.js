import React from "react";
import PropTypes from "prop-types";
import { zonedTimeToUtc, utcToZonedTime, toDate } from "date-fns-tz";
import { DateTimePicker, DatePicker, TimePicker } from "@material-ui/pickers";

const componentTypes = {
	datetime: DateTimePicker,
	date: DatePicker,
	time: TimePicker,
};

const isoDateRegExp =
	/^(\d{1,})-?(\d{2})?-?(\d{2})T?(\d{2})?:?(\d{2})?:?(\d{2})?\.?(\d{3})?(Z|[+-]\d{2}:\d{2})?/;
const timeRegExp = /^(\d{2}):(\d{2}):?(\d{2})?\.?(\d{3})?/;

const getDateForPicker = (str, timezone) => {
	if (isoDateRegExp.test(str)) {
		return timezone ? utcToZonedTime(new Date(str), timezone) : toDate(str);
	} else if (timeRegExp.test(str)) {
		const date = new Date();
		const utcDateISOString = new Date(
			Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
		).toISOString();
		return toDate(
			utcDateISOString.substring(0, utcDateISOString.indexOf("T") + 1) + str
		);
	}
	return null;
};

const FormikFieldDateTimePicker = ({
	field,
	form,
	type,
	timezone,
	returnDateOnly,
	...restProps
}) => {
	const CustomTag = componentTypes[type];
	const currentError = form.errors[field.name];

	const pickerValue = getDateForPicker(field.value, timezone);

	const handleChange = (date) => {
		if (date === null) {
			form.setFieldValue(field.name, null, true);
			return;
		}

		let storedValue;
		if (timezone) {
			storedValue = zonedTimeToUtc(date, timezone).toISOString();
			storedValue = returnDateOnly
				? storedValue.substring(0, storedValue.indexOf("T"))
				: storedValue;
		} else {
			const utcDateIsoString = new Date(
				Date.UTC(
					date.getFullYear(),
					date.getMonth(),
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
					date.getSeconds(),
					date.getMilliseconds()
				)
			).toISOString();

			if (isoDateRegExp.test(field.value)) {
				storedValue = !returnDateOnly
					? utcDateIsoString.substring(0, utcDateIsoString.indexOf("Z"))
					: utcDateIsoString.substring(0, utcDateIsoString.indexOf("T"));
			} else {
				storedValue = utcDateIsoString.substring(
					utcDateIsoString.indexOf("T") + 1,
					utcDateIsoString.indexOf("Z")
				);
			}
		}
		form.setFieldValue(field.name, storedValue, true);
	};

	const handleBlur = (e) => {
		field.onBlur(e);
	};

	return (
		<CustomTag
			name={field.name}
			value={pickerValue}
			helperText={currentError}
			error={Boolean(currentError)}
			onError={(_, error) => form.setFieldError(field.name, error)}
			onChange={handleChange}
			onBlur={handleBlur}
			{...restProps}
		/>
	);
};

FormikFieldDateTimePicker.propTypes = {
	field: PropTypes.shape().isRequired,
	form: PropTypes.shape().isRequired,
	type: PropTypes.oneOf(["datetime", "date", "time"]),
	timezone: PropTypes.string,
	returnDateOnly: PropTypes.bool,
};

FormikFieldDateTimePicker.defaultProps = {
	type: "datetime",
	returnDateOnly: false,
};

export default FormikFieldDateTimePicker;
