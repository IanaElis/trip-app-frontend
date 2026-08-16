import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";

function DateTimePickerField({
    label,
    value,
    onChange,
    required = false,
    showTimeSelect = true,
    dateFormat = "dd-MM-yyyy HH:mm",
    placeholder = "Select date & time"
}) {

    const selectedDate =
        value ? new Date(value) : null;

    return (
        <Form.Group className="mb-3">
            {label && <Form.Label>{label}</Form.Label>}

            <DatePicker
                selected={selectedDate}
                onChange={(date) => onChange(date)}
                showTimeSelect={showTimeSelect}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                className="form-control"
                required={required}
            />
        </Form.Group>
    );
}

export default DateTimePickerField;