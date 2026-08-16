import { axiosInstance } from "./axiosInstance.jsx";

async function handleRequest(request) {
    try {
        const res = await request();
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
}

export const tripsApi = {
    createTrip: async (tripData) => {
        return handleRequest(() => axiosInstance.post('/trips', tripData));
    },
    updateTrip: async (id, tripData) => {
        return handleRequest(() => axiosInstance.put(`/trips/${id}`, tripData));
    },
    deleteTrip: async (id) => {
        return handleRequest(() => axiosInstance.delete(`/trips/${id}`));
    },
    getAllTrips: async () => {
        return handleRequest(() => axiosInstance.get(`/trips`));
    },
    getTripById: async (id) => {
        return handleRequest(() => axiosInstance.get(`/trips/${id}`));
    },
}

export const formatTripDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sameMonth = start.getUTCMonth() === end.getUTCMonth() &&
        start.getUTCFullYear() === end.getUTCFullYear();

    const pastTrip = end < new Date();

    const options = {
        weekday: "short",
        day: "numeric",
        timeZone: "UTC"
    };

    let startPart;
    if (sameMonth) {
        startPart = new Intl.DateTimeFormat("en-GB", options).format(start);
    }
    else {
        startPart = new Intl.DateTimeFormat("en-GB", {
            ...options,
            month: "short",
        }).format(start);
    }

    let endPart;

    if (pastTrip) {
        endPart = new Intl.DateTimeFormat("en-GB", {
            ...options,
            month: "short",
            year: "numeric",
        }).format(end);
    }
    else {
        endPart = new Intl.DateTimeFormat("en-GB", {
            ...options,
            month: "short",
        }).format(end);
    }

    return `${startPart} - ${endPart}`;
}


export const toTripStartUtc = (date) => `${date}T00:00:00Z`;
export const toTripEndUtc = (date) => `${date}T23:59:59Z`;



export const getTripDuration = (startDate, endDate) => {
    const start = new Date(startDate.substring(0, 10));
    const end = new Date(endDate.substring(0, 10));

    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

export const getCountdown = (startDate, endDate) => {
     const today = new Date();
     today.setUTCHours(0, 0, 0, 0);
 
     const start = new Date(startDate);
     const end = new Date(endDate);

     const daysTillStart = Math.floor((start - today) / (1000 * 60 * 60 * 24));
     const daysBeforeEnd = Math.floor((end - today)/ (1000 * 60 * 60 *24));
     
     if (daysBeforeEnd < 0) return "Passed";
     if (daysTillStart < 0) return "Started";
     if (daysTillStart === 0) return "Starts today";
     if (daysTillStart === 1) return "Starts tomorrow";
 
     return `Starts in ${daysTillStart} days`; 
}