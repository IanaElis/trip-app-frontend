import {Row, Col} from "react-bootstrap";
//import "./AccommodationCard.css";
import { FaPersonWalking } from "react-icons/fa6";
import TimelineRow from "../TimelineRow/TimelineRow";

function ActivityDetails({ event, onClick }) {
    const activity = event.item.details;

    const details = [
        activity.location?.formattedAddress,
        event.item.notes
    ].filter(Boolean);


      return (
        <TimelineRow
            time={event.time}
            timeZone={activity.location?.timezoneId}
            icon={<FaPersonWalking />}
            title={activity.title ?? "Activity"}
            details={details}
            onClick={onClick}
        />
    );
}

export default ActivityDetails;

