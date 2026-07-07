import AccommodationDetails from "./Accommodation/AccommodationDetails";
import ActivityDetails from "./Activity/ActivityDetails";
import TransportDetails from "./Transport/TransportDetails";
import FlightDetails from "./Flight/FlightDetails";

function TimelineItem({ event, onClick }) {

    switch (event.item.itemType) {
         case "TRANSPORT":
             return <TransportDetails event={event} onClick={onClick} />; 
        case "ACCOMMODATION":
            return <AccommodationDetails event={event} onClick={onClick} />;
        case "ACTIVITY":
              return <ActivityDetails event={event} onClick={onClick} />; 
        case "FLIGHT":
            return <FlightDetails event={event} onClick={onClick} />;
        default:
            return null;
    }
}

export default TimelineItem;


