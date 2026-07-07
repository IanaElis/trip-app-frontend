import "./TripMap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "./MapMarker";
import { useMemo } from "react";
import FitBounds from "./FitBounds";

function TripMap({ itinerary }) {
    const trip = itinerary?.trip;
    if (!itinerary) {
        return null;
    }

     // center = destination
    const center = useMemo(() => {
        const lat = trip?.destination?.latitude;
        const lng = trip?.destination?.longitude;

        if (typeof lat === "number" && typeof lng === "number") {
            return [lat, lng];
        }
            return [48.8566, 2.3522]; // default if no destination
}, [trip]);

    // itinerary items into map points
    const places = useMemo(() => {
        if (!itinerary?.items) return [];
        
        const result = [];

        itinerary.items.forEach(item => {
            switch (item.itemType) {

                case "FLIGHT":
                    if (item.details?.departureAirport) {
                        result.push({
                            id: `dep-${item.id}`,
                            itemId: item.id,
                            type: "AIRPORT",
                            name: item.details.departureAirport.name,
                            lat: item.details.departureAirport.latitude,
                            lng: item.details.departureAirport.longitude
                        });
                    }

                    if (item.details?.arrivalAirport) {
                        result.push({
                            id: `arr-${item.id}`,
                            itemId: item.id,
                            type: "AIRPORT",
                            name: item.details.arrivalAirport.name,
                            lat: item.details.arrivalAirport.latitude,
                            lng: item.details.arrivalAirport.longitude
                        });
                    }
                    break;

                case "TRANSPORT":
                    if (item.details?.departureLocation) {
                        result.push({
                            id: `tdep-${item.id}`,
                            itemId: item.id,
                            type: "TRANSPORT",
                            name: "Departure",
                            lat: item.details.departureLocation.latitude,
                            lng: item.details.departureLocation.longitude
                        });
                    }

                    if (item.details?.arrivalLocation) {
                        result.push({
                            id: `tarr-${item.id}`,
                            itemId: item.id,
                            type: "TRANSPORT",
                            name: "Arrival",
                            lat: item.details.arrivalLocation.latitude,
                            lng: item.details.arrivalLocation.longitude
                        });
                    }
                    break;

                case "ACCOMMODATION":
                    if (item.details?.location) {
                        result.push({
                            id: `acc-${item.id}`,
                            itemId: item.id,
                            type: "HOTEL",
                            name: item.details.location.name,
                            lat: item.details.location.latitude,
                            lng: item.details.location.longitude
                        });
                    }
                    break;

                case "ACTIVITY":
                    if (item.details?.location) {
                        result.push({
                            id: `act-${item.id}`,
                            itemId: item.id,
                            type: "ACTIVITY",
                            name: item.details.title,
                            lat: item.details.location.latitude,
                            lng: item.details.location.longitude
                        });
                    }
                    break;
            }
        });

        return result;
        
    }, [itinerary]);

    console.log("Places for map:", places);

    return (
        <MapContainer
            center={center}
            zoom={6}
            scrollWheelZoom={true}
            className="trip-map"
        >
            <TileLayer
             attribution='&copy; Leaflet'
                url="https://leafletjs.com"
                attribution='&copy; OpenStreetMap'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds places={places} />
              {places.map(place => (
                <MapMarker key={place.id} place={place} />
              ))}

        </MapContainer>
    );
}

export default TripMap;