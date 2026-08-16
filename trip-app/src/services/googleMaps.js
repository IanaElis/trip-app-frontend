import { setOptions } from "@googlemaps/js-api-loader";

setOptions({
    key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
});