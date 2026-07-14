import { useEffect, useRef, useState } from "react";
import { importLibrary } from "@googlemaps/js-api-loader"


function PlaceAutocompleteInput({
    onPlaceSelect,
}) {
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const sessionTokenRef = useRef(null);
    let autocomplete;


    useEffect(() => {
        let cancelled = false;

        async function init() {
            if (cancelled) return;

            const { PlaceAutocompleteElement, AutocompleteSessionToken } = await importLibrary("places");

            if (!containerRef.current) return;
            containerRef.current.innerHTML = "";

            sessionTokenRef.current = new AutocompleteSessionToken();

           // const 
            autocomplete = new PlaceAutocompleteElement();
            autocomplete.sessionToken = sessionTokenRef.current;

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

                sessionTokenRef.current = new AutocompleteSessionToken();
                autocomplete.sessionToken = sessionTokenRef.current;
            });
        }

        init();

        return () => {
            cancelled = true;
            if (containerRef.current)
                containerRef.current.innerHTML = "";
        };
    }, []);

    return (
        <div>
            <div ref={containerRef} />
        </div>
    );
}

export default PlaceAutocompleteInput;