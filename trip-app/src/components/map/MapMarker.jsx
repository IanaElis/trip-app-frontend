import { Marker, Popup } from "react-leaflet";

import L, { icon } from "leaflet";

/*import hotelIcon from "../assets/map/hotel.png";
import planeIcon from "../assets/map/plane.png";
import activityIcon from "../assets/map/activity.png";
import transportIcon from "../assets/map/transport.png";*/

import { FaHotel, FaPlane, FaCar, FaHiking } from "react-icons/fa";


function getMarkerIcon(type) {
    let iconUrl;
    let icon;

    switch (type) {
        case "HOTEL":
        case "ACCOMMODATION":
          //  iconUrl = hotelIcon;
          icon = FaHotel;
            break;

        case "FLIGHT":
        case "AIRPORT":
            //iconUrl = planeIcon;
            icon = FaPlane;
            break;

        case "ACTIVITY":
            //iconUrl = activityIcon;
            icon = FaHiking;
            break;

        case "TRANSPORT":
            //iconUrl = transportIcon;
            icon = FaCar;
            break;
        default:
            //iconUrl = activityIcon;
            icon = FaHiking;
    }

    return L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
}

function MapMarker({ place }) {

    return (
        <Marker position={[place.lat, place.lng]}
               /*icon={getMarkerIcon(place.type)} */
               >
            <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.type}
            </Popup>
        </Marker>
    );
}

export default MapMarker;