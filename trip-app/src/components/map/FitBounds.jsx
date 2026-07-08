import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function FitBounds({ places }) {
    const map = useMap();

    useEffect(() => {
        if (!places || places.length === 0) return;

        const bounds = L.latLngBounds(
            places.map(p => [p.lat, p.lng])
        );
        map.fitBounds(bounds, {
            padding: [50, 50],   // space around markers
            maxZoom: 12          // prevents over-zooming
        });
    }, [places, map]);

    return null;
}

export default FitBounds;

