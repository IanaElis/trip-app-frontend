import { useEffect, useRef } from "react";

function loadGoogleMaps(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.google?.maps) {
            resolve(window.google);
            return;
        }

        const existing = document.getElementById("google-maps-script");

        if (existing) {
            existing.addEventListener("load", () => resolve(window.google));
            return;
        }

        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;

        script.onload = () => resolve(window.google);
        script.onerror = reject;

        document.head.appendChild(script);
    });
}


function PlaceAutocompleteInput({
    value,
    onPlaceSelect,
}) {
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            console.error("Missing Google Maps API key");
            return;
        }

        let cancelled = false;

        async function init() {
            const google = await loadGoogleMaps(apiKey);

            if (cancelled || !google?.maps) return;

            const { PlaceAutocompleteElement } =
                await google.maps.importLibrary("places");

            if (!containerRef.current) return;

            containerRef.current.innerHTML = "";

            const autocomplete = new PlaceAutocompleteElement();

            inputRef.current = autocomplete;
            containerRef.current.appendChild(autocomplete);


            autocomplete.addEventListener("gmp-select", async (event) => {
                const place = event.placePrediction.toPlace();

                await place.fetchFields({
                    fields: [
                        "id",
                        "displayName",
                        "formattedAddress",
                        "location",
                        "addressComponents",
                        "timeZone"
                    ]
                });
                autocomplete.value = place.displayName;

                console.log("PLACE:", place);

                let city = "";
                let country = "";

                place.addressComponents?.forEach((c) => {
                    if (c.types.includes("locality")) {
                        city = c.longText;
                    }
                    if (c.types.includes("country")) {
                        country = c.longText;
                    }
                });

                const lat = typeof place.location?.lat === "function"
                    ? place.location.lat()
                    : place.location?.lat;

                const lng = typeof place.location?.lng === "function"
                    ? place.location.lng()
                    : place.location?.lng;


                onPlaceSelect?.({
                    googlePlaceId: place.id,
                    name: place.displayName,
                    formattedAddress: place.formattedAddress,
                    city,
                    country,
                    latitude: place.location?.lat(),
                    longitude: place.location?.lng(),
                    timezoneId: place.timeZone?.id
                });
            });
        }

        init();

        return () => {
            cancelled = true;
            if (containerRef.current)
                containerRef.current.innerHTML = "";
        };
    }, []);
    //onPlaceSelect
    return (
        <div>
            <div ref={containerRef} />
        </div>
    );
}

export default PlaceAutocompleteInput;