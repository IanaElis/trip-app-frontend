import {Row, Col} from "react-bootstrap";
//import "./AccommodationCard.css";
import { FaBus } from "react-icons/fa";
import { BiSolidTrain } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import TimelineRow from "../TimelineRow/TimelineRow";

function TransportDetails({ event, onClick }) {
    const transport = event.item.details;

    const details = [
        event.type !== "DROP_OFF" && event.type !== "PICK_UP" 
        && transport.companyName && transport.transportId
        && `${transport.companyName} ${transport.transportId}`,
        transport.confirmationNumber && `Confirmation: ${transport.confirmationNumber}`,
    ].filter(Boolean);

    function getTransportIcon(type) {
        switch (type) {
            case "BUS":
                return <FaBus />;
            case "TRAIN":
                return <BiSolidTrain />;
            case "CAR":
                return <FaCar />;
        }
    }

    function getTitle() {
        switch (event.type) {
            case "TRANSPORT":
                return `${transport.departureLocation?.name} -> ${transport.arrivalLocation?.name}`;
            case "PICK_UP":
                return `${transport.companyName}, pick-up`;
            case "DROP_OFF":
                return `${transport.companyName}, drop-off`;
            default:
                return `${"Transportation"}`;
        }
    }


    return (
        <TimelineRow
            time={event.time}
            timeZone={event.type === "DROP_OFF"
                ? transport.arrivalLocation?.timezoneId
                : transport.departureLocation?.timezoneId}
            icon={getTransportIcon(transport.transportType)}
            title={getTitle()}
            details={details}
            onClick={onClick}
        />
    );
}

export default TransportDetails;

