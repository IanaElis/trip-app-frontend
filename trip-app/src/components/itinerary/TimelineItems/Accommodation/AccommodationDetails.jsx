import { Row, Col } from "react-bootstrap";
import "./AccommodationDetails.css";
import { FaHotel } from "react-icons/fa";
import TimelineRow from "../TimelineRow/TimelineRow";

function AccommodationDetails({ event, onClick }) {
    const accommodation = event.item.details;

    const details = [
         event.time && event.type === "CHECK_IN" &&
        `Check-in: ${new Date( event.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`,
         event.time && event.type === "CHECK_OUT" &&
        `Check-out: ${new Date( event.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`,
        accommodation.location?.formattedAddress,
    ].filter(Boolean);


    function getTitle() {
        return accommodation.location?.name ?? "Accommodation";
    }


    return (
        <TimelineRow
            time={event.time}
            timeZone={accommodation.location?.timezoneId}
            icon={<FaHotel />}
            title={getTitle()}
            details={details}
            onClick={onClick}
        />
    );
}

export default AccommodationDetails;

