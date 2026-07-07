//format
import AccommodationDetails from "../components/itinerary/TimelineItems/Accommodation/AccommodationDetails";
import ActivityDetails from "../components/itinerary/TimelineItems/Activity/ActivityDetails";
import { useState, useEffect } from "react";
import {
    Container, Row, Col, Card, CardImgOverlay, CardBody,
    Button, CardImg, Tabs, Tab
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import TimelineItem from "../components/itinerary/TimelineItems/TimelineItem";
import { itineraryItemsApi } from "../services/itineraryService";
import { useNavigate, useParams } from "react-router-dom";
import iceland from '../assets/iceland.jpg';
import "./ItineraryPage.css";
import TripMap from "../components/map/TripMap";
import { formatTripDates, getTripDuration, tripsApi } from "../services/tripService";
import { buildTimeline, groupEventsByDay } from "../services/itineraryService";
import DaySeparator from "../components/itinerary/TimelineItems/DaySeparator";
import { ThreeDotsVertical, PlusLg } from "react-bootstrap-icons";
import CreateAccommodationModal from "../components/itinerary/modals/CreateAccommodationModal"
import CreateFlightModal from "../components/itinerary/modals/CreateFlightModal";
import CreateTransportModal from "../components/itinerary/modals/CreateTransportModal";
import CreateActivityModal from "../components/itinerary/modals/CreateActivityModal";
import EditTripModal from "../components/trip/EditTripModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"


function ItineraryPage() {

    const { tripId } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null); // for item creation modals

    const [showEditModal, setShowEditModal] = useState(false);
    const [tripToEdit, setTripToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const loadItinerary = async () => {
        try {
            const data = await itineraryItemsApi.getItinerary(tripId);
            setItinerary(data);
        } catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadItinerary();
    }, [tripId]);


    if (loading || !itinerary) {
        return <p>Loading...</p>;
    }

    if (error)
        return <p>Could not load itinerary.</p>;


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


    function handleMoreActions(key) {
        switch (key) {
            case "print":
                navigate(`/trips/${tripId}/report`);
                break;
            case "delete":
                setShowDeleteModal(true)
                break;
            default: break;
        }
    }


    return (
        <Container fluid>

            {/* HEADER (trip card) */}
            <Card className="trip-header-card mb-4 shadow-sm position-relative">
                <Card.Img src={iceland} alt="Trip" />
                <Card.ImgOverlay className="d-flex flex-column p-4">
                    <Row className="align-items-stretch">
                        <Row xs="auto">
                            <div className="trip-back-link mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none"
                                    onClick={() => navigate("/trips")}>
                                    ← All Trips
                                </Button>
                            </div>
                        </Row>
                        <Col xs={11} md={6} lg={9} className="text-start text-white
                        d-flex flex-column justify-content-center">

                            <h2 className="trip-name mb-2 text-white">
                                {trip.name}
                            </h2>

                            <div className="trip-dates mb-1">
                                📅 {formatTripDates(trip.startDate, trip.endDate)}
                            </div>

                            <div className="trip-duration mb-1">
                                ⏳ {getTripDuration(trip.startDate, trip.endDate)} days
                            </div>

                            <div className="trip-destination">
                                🌍 {trip.destination?.name}
                            </div>
                        </Col>

                        {/*LETS TRY */}
                        <Col lg={3} md={6}
                            className="d-none d-md-flex flex-column align-items-end">
                            <div className="w-100 trip-actions mt-2">

                                <div className="trip-top-actions">
                                    <Button variant="outline-light" onClick={handleEdit}>
                                        Edit Trip
                                    </Button>

                                    <Dropdown onSelect={handleMoreActions}>
                                        <Dropdown.Toggle as={Button}
                                            variant="outline-light"
                                            className="w-100">
                                            More
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item eventKey="print">
                                                Print Trip</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item eventKey="delete"
                                                className="text-danger">
                                                Delete Trip</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <DropdownButton variant="primary"
                                    title="Add Item" className="add-item-dropdown w-100"
                                    onSelect={handleAddItem}>
                                    <Dropdown.Item eventKey="accommodation">
                                        Accommodation</Dropdown.Item>
                                    <Dropdown.Item eventKey="flight">
                                        Flight</Dropdown.Item>
                                    <Dropdown.Item eventKey="transport">
                                        Transport</Dropdown.Item>
                                    <Dropdown.Item eventKey="activity">
                                        Activity</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Col>
                        {/*END OF TRY*/}

                        {/* LEYS TRY MOBILE*/}
                        <Col xs={1} md={3} className="d-lg-none d-md-none align-item-end">
                            <Dropdown align="end" onSelect={handleMoreActions}>
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-white p-0 border-0">
                                    <ThreeDotsVertical className="three-dots" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleEdit}>Edit Trip</Dropdown.Item>
                                    <Dropdown.Item eventKey="print">Print Trip</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="text-danger"
                                        eventKey="delete">Delete Trip</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/*END OF TRY MOBILE */}
                    </Row>
                </Card.ImgOverlay>
            </Card>


            <Dropdown drop="up" onSelect={handleAddItem}>
                <Dropdown.Toggle
                    className="fab-add-item d-md-none align-items-center"
                    variant="primary" >
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="accommodation">Accommodation</Dropdown.Item>
                    <Dropdown.Item eventKey="flight">Flight</Dropdown.Item>
                    <Dropdown.Item eventKey="transport">Transport</Dropdown.Item>
                    <Dropdown.Item eventKey="activity">Activity</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

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
            />

            <CreateFlightModal
            tripId={tripId}
                show={activeModal === "flight"}
                onHide={() => setActiveModal(null)}
            />

            <CreateTransportModal
            tripId={tripId}
                show={activeModal === "transport"}
                onHide={() => setActiveModal(null)}
            />

            <CreateActivityModal
            tripId={tripId}
                show={activeModal === "activity"}
                onHide={() => setActiveModal(null)}
            />
        </Container>

    );
}

export default ItineraryPage;