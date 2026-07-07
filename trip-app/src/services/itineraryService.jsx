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

export const itineraryItemsApi = {
    createAccommodation: async (tripId, accommodationData) => {
        return handleRequest(() => 
            axiosInstance.post(`/trips/${tripId}/accommodation/create`, accommodationData));
    },
    createActivity: async (tripId, activityData) => {
        return handleRequest(() => 
            axiosInstance.post(`/trips/${tripId}/activity/create`, activityData));
    },
    createTransport: async (tripId, transportData) => {
        return handleRequest(() => 
            axiosInstance.post(`/trips/${tripId}/transport/create`, transportData));
    },
    createFlight: async (tripId, flightData) => {
        return handleRequest(() => 
            axiosInstance.post(`/trips/${tripId}/flight/create`, flightData));
    },
    updateAccommodation: async (tripId, itemId, accommodationData) => {
        return handleRequest(() => 
            axiosInstance.put(`/trips/${tripId}/accommodation/${itemId}`, accommodationData));
    },
    updateActivity: async (tripId, itemId, activityData) => {
        return handleRequest(() => 
            axiosInstance.put(`/trips/${tripId}/activity/${itemId}`, activityData));
    },
    updateTransport: async (tripId, itemId, transportData) => {
        return handleRequest(() => 
            axiosInstance.put(`/trips/${tripId}/transport/${itemId}`, transportData));
    },
    updateFlight: async (tripId, itemId, flightData) => {
        return handleRequest(() => 
            axiosInstance.put(`/trips/${tripId}/flight/${itemId}`, flightData));
    },
    deleteItem: async (tripId, itemId) => {
        return handleRequest(() => 
            axiosInstance.delete(`/trips/${tripId}/${itemId}`));
    },
    getAccommodation: async (tripId, itemId) => {
        return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/accommodation/${itemId}`));
    },
    getActivity: async (tripId, itemId) => {
        return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/activity/${itemId}`));
    },
    getTransport: async (tripId, itemId) => {
        return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/transport/${itemId}`));
    },
    getFlight: async (tripId, itemId) => {
        return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/flight/${itemId}`));
    },
    getItinerary: async (tripId) => {
        return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/itinerary`));
    },
    getReport: async (tripId) => {
         return handleRequest(() => 
            axiosInstance.get(`/trips/${tripId}/report`));
    }
}


export const buildTimeline = (items) => {
        const events = [];

        items.forEach(item => {
            switch (item.itemType) {
                case "ACCOMMODATION":
                    events.push({
                        id: item.id + "-checkin",
                        type: "CHECK_IN",
                        time: item.startDateTime,
                        item
                    });
                    events.push({
                        id: item.id + "-checkout",
                        type: "CHECK_OUT",
                        time: item.endDateTime,
                        item
                    });
                    break;
                case "ACTIVITY":
                    events.push({
                        id: item.id,
                        time: item.startDateTime,
                        item
                    });
                    break;
                case "TRANSPORT":
                     const transportType =
        item.details?.transportType ?? item.transportType;
                    if (transportType === "CAR") {
                        events.push({
                            id: item.id + "-pick-up",
                            type: "PICK_UP",
                            time: item.startDateTime,
                            item
                        });
                        events.push({
                            id: item.id + "-drop-off",
                            type: "DROP_OFF",
                            time: item.endDateTime,
                            item
                        });
                    }
                    else
                        events.push({
                            id: item.id,
                            type: "TRANSPORT",
                            time: item.startDateTime,
                            item
                        });
                    break;
                case "FLIGHT":
                    events.push({
                        id: item.id,
                        time: item.startDateTime,
                        item
                    });
                    break;
                default:
                    console.warn(`Unknown item type: ${item.itemType}`);
            }
        });

        return events.sort(
            (a, b) => new Date(a.time) - new Date(b.time)
        );

    }


export const groupEventsByDay = (events) => {
        const groups = new Map();

    events.forEach(event => {
        const date = event.time.substring(0, 10);

        if (!groups.has(date)) {
            groups.set(date, []);
        }
        groups.get(date).push(event);
    });

       return Array.from(groups.entries()).map(([date, events]) => ({
            date,
            events
        })); 
    }