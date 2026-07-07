import { itineraryItemsApi } from "../services/itineraryService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import FullItem from "../components/itinerary/FullItems/FullItem";
import EditAccommodationModal from "../components/itinerary/modals/edit/EditAccommodationModal";
import EditTransportModal from "../components/itinerary/modals/edit/EditTransportModal";
import EditActivityModal from "../components/itinerary/modals/edit/EditActivityModal";
import EditFlightModal from "../components/itinerary/modals/edit/EditFlightModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const ITEM_CONFIG = {
    ACCOMMODATION: {
        load: (tripId, itemId) => itineraryItemsApi.getAccommodation(tripId, itemId),
    },
    TRANSPORT: {
        load: (tripId, itemId) => itineraryItemsApi.getTransport(tripId, itemId),
    },
    ACTIVITY: {
        load: (tripId, itemId) => itineraryItemsApi.getActivity(tripId, itemId),
    },
    FLIGHT: {
        load: (tripId, itemId) => itineraryItemsApi.getFlight(tripId, itemId),
    }
};


function FullItemPage() {
    const { tripId, itemType, itemId } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const normalizedType = itemType?.toUpperCase();

    async function loadFullItems() {
        try {
            const config = ITEM_CONFIG[normalizedType];
            if (!config) {
                throw new Error("Unknown item type: " + itemType);
            }
            const data = await config.load(tripId, itemId);
            setItem(data);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFullItems();

    }, [tripId, itemId, itemType]);



    function renderEditModal() {
        if (!item) return null;

        const commonProps = {
            show: showEdit,
            onHide: () => setShowEdit(false),
            item,
            onUpdated: loadFullItems
            
        };

        switch (normalizedType) {
            case "ACCOMMODATION":
                return <EditAccommodationModal {...commonProps} />;
            case "TRANSPORT":
                return <EditTransportModal {...commonProps} />;
            case "ACTIVITY":
                return <EditActivityModal {...commonProps} />;
            case "FLIGHT":
                return <EditFlightModal {...commonProps} />;
            default:
                return null;
        }
    }

    if (loading) return <Spinner animation="border" className="align-center" />;

    if (error) return <p>Could not load item</p>;

    async function handleDelete() {
        try {
            await itineraryItemsApi.deleteItem(
                tripId,
                itemId
            );

            navigate(`/trips/${tripId}`);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container fluid className="px-4">
            <FullItem
                item={item}
                onBack={() => navigate(`/trips/${tripId}`)}
                onEdit={() => setShowEdit(true)}
                onDelete={() => setShowDelete(true)} />

            {renderEditModal()}
            <ConfirmDeleteModal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                onConfirm={handleDelete}
                title="Delete Item"
                message="This action cannot be undone. Continue?"
            />
        </Container>
    );

}

export default FullItemPage;