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

        const sameMonth = start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear();

        const pastTrip = end < new Date();

        let startPart;
        if (sameMonth) {
            startPart = new Intl.DateTimeFormat("en-GB", {
                weekday: "short",
                day: "numeric",
            }).format(start);
        }
        else {
            startPart = new Intl.DateTimeFormat("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }).format(start);
        }

        let endPart;
        if (pastTrip) {
            endPart = new Intl.DateTimeFormat("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            }).format(end);
        }
        else {
            endPart = new Intl.DateTimeFormat("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }).format(end);
        }

        return `${startPart} - ${endPart}`;
    }

export const getTripDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }


export  const getCountdown = (startDate, endDate) => {
        if(endDate && new Date(endDate) < new Date()) return null;
        const today = new Date();
        
        const start = new Date(startDate);

        today.setHours(start.getHours());

        const days = Math.floor((start - today) / (1000 * 60 * 60 * 24));
        if (days < 0) return "Started";
        if (days === 0) return "Starts today";
        if (days === 1) return "Starts tomorrow";

        return `Starts in ${days} days`;
    }