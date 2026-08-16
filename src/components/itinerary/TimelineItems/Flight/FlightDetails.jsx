import { Row, Col } from "react-bootstrap";
import { MdFlightTakeoff } from "react-icons/md";
import TimelineRow from "../TimelineRow/TimelineRow";

function FlightDetails({ event, onClick }) {
    const flight = event.item.details;

    const formatTime = (dateTime, timeZone) => {
        if (!dateTime) return "";
        return new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            day: "numeric",
            month: "short",
            timeZone,
            timeZoneName: "short"
        }).format(new Date(dateTime));
    }

    const details = [
        flight.airline && flight.flightNumber
        && `${flight.flightNumber} (${flight.airline?.name})`,
        flight.confirmationNumber && `Confirmation: ${flight.confirmationNumber}`,
        event.item.endDateTime &&
        `Arrival: ${formatTime(event.item.endDateTime, flight.arrivalAirport?.timezoneId)}`,
    ].filter(Boolean);




    function getTitle() {
        if (!flight.departureAirport || !flight.arrivalAirport) {
            return "Flight";
        }
        return `${flight.departureAirport.iataCode} → ${flight.arrivalAirport.iataCode}`;
    }

    return (
        <TimelineRow
            time={event.time}
            timeZone={flight.departureAirport?.timezoneId}
            icon={<MdFlightTakeoff />}
            title={getTitle()}
            details={details}
            onClick={onClick}
        />
    );
}

export default FlightDetails;