import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardImgOverlay, CardBody,
    Button, CardImg, Tabs, Tab, Spinner} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import TimelineItem from "../components/itinerary/TimelineItems/TimelineItem";
import { itineraryItemsApi } from "../services/itineraryService";
import { useNavigate, useParams } from "react-router-dom";

import "./ItineraryPage.css";
import TripMap from "../components/map/TripMap";
import {tripsApi } from "../services/tripService";
import { buildTimeline, groupEventsByDay } from "../services/itineraryService";
import DaySeparator from "../components/itinerary/TimelineItems/DaySeparator";
import { PlusLg } from "react-bootstrap-icons";
import CreateAccommodationModal from "../components/itinerary/modals/CreateAccommodationModal"
import CreateFlightModal from "../components/itinerary/modals/CreateFlightModal";
import CreateTransportModal from "../components/itinerary/modals/CreateTransportModal";
import CreateActivityModal from "../components/itinerary/modals/CreateActivityModal";
import EditTripModal from "../components/trip/EditTripModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"
import { extractErrorMessage } from "../utils/extractErrorMessage";
import TripHeader from "../components/trip/TripHeader";


function ItineraryPage() {
    const { tripId } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null); // for item creation modals

    const [showEditModal, setShowEditModal] = useState(false);
    const [tripToEdit, setTripToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const loadItinerary = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await itineraryItemsApi.getItinerary(tripId);
            setItinerary(data);
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to load itinerary"));
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadItinerary();
    }, [tripId]);


    if (loading) {
        return <Spinner animation="border" className="align-center" />;
    }

    if (error)
        return <p>{error}</p>;

    if (!itinerary) {
        return <p>Trip itinerary could not be loaded.</p>;
    }

    const events = buildTimeline(itinerary.items);
    const dayGroups = groupEventsByDay(events);

    const trip = itinerary.trip;


    function getItemRoute(tripId, item) {
        return `/trips/${tripId}/items/${item.itemType.toLowerCase()}/${item.id}`;
    }

    async function handleEdit() {
        const data = await tripsApi.getTripById(tripId);
        setTripToEdit(data);
        setShowEditModal(true);
    }

    function handleAddItem(type) {
        setActiveModal(type);
    }

    async function handleDelete() {
        await tripsApi.deleteTrip(tripId);
        setShowDeleteModal(false);
        navigate("/trips");
    }



    return (
        <Container fluid>

            <TripHeader
                trip={trip}
                onEdit={handleEdit}
                onDelete={() => setShowDeleteModal(true)}
                onAddItem={handleAddItem}
                onPrint={() => navigate(`/trips/${tripId}/summary`)}
            />

            {/*Content*/}
            <Row className="g-4">

                {/*TIMELINE*/}
                <Col className="timeline-column" xs={12} lg={5}>
                    {dayGroups.map(day => (
                        <div key={day.date}>

                            <DaySeparator date={day.date} />

                            {day.events.map(event => (
                                <TimelineItem
                                    key={event.id}
                                    event={event}
                                    onClick={() => navigate(getItemRoute(tripId, event.item))}
                                />
                            ))}

                        </div>
                    ))}
                </Col>

                {/* MAP */}
                <Col className="map-column" xs={12} lg={7}>
                    {itinerary && (<TripMap itinerary={itinerary} />)}
                </Col>
            </Row>

            {/* Modals */}

            <EditTripModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                trip={tripToEdit}
                onUpdated={loadItinerary}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Trip"
                message="This action will permanently delete this trip. Continue?"
            />

            <CreateAccommodationModal
                tripId={tripId}
                show={activeModal === "accommodation"}
                onHide={() => setActiveModal(null)}
                onUpdated={loadItinerary}
            />

            <CreateFlightModal
                tripId={tripId}
                show={activeModal === "flight"}
                onHide={() => setActiveModal(null)}
                onUpdated={loadItinerary}
            />

            <CreateTransportModal
                tripId={tripId}
                show={activeModal === "transport"}
                onHide={() => setActiveModal(null)}
                onUpdated={loadItinerary}
            />

            <CreateActivityModal
                tripId={tripId}
                show={activeModal === "activity"}
                onHide={() => setActiveModal(null)}
                onUpdated={loadItinerary}
            />
        </Container>

    );
}

export default ItineraryPage;