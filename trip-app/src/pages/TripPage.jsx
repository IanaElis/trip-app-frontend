import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import background from '../assets/background.jpg';
import TripCard from "../components/trip/TripCard/TripCard";
import { tripsApi } from "../services/tripService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatTripDates, getTripDuration, getCountdown } from "../services/tripService";
import AddTripCard from "../components/trip/AddTripCard";
import CreateTripModal from "../components/trip/CreateTripModal";
import { extractErrorMessage } from "../utils/extractErrorMessage";


function TripPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const loadTrips = async () => {
        try {
            const data = await tripsApi.getAllTrips();
            setTrips(data);
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to load trips"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setError("");
        setLoading(true);
        loadTrips();
    }, []);


    if (loading) return <Spinner animation="border" className="align-center" />;


    const activeTrips = [];
    const passedTrips = [];

    for (const trip of trips) {
        if (getCountdown(trip.startDate, trip.endDate) === "Passed") {
            passedTrips.push(trip);
        } else {
            activeTrips.push(trip);
        }
    }

    return (
        <Container fluid className="py-4 px-4">
            <h1 className="mb-4 ms-4">Trip Page</h1>

            {error &&
                <Alert>
                    {error}
                </Alert>
            }


            <Row xs={1} sm={2} xl={3} className="g-4">
                {activeTrips.map((trip) => (
                    <Col key={trip.id}>
                        <TripCard
                            name={trip.name}
                            dateRange={formatTripDates(trip.startDate, trip.endDate)}
                            duration={getTripDuration(trip.startDate, trip.endDate)}
                            countdown={getCountdown(trip.startDate, trip.endDate)}
                            image={background}
                            onClick={() => navigate(`/trips/${trip.id}`)}
                        />
                    </Col>
                ))}
                <Col>
                    <AddTripCard onClick={() => setShowModal(true)} />
                </Col>
            </Row>

            {passedTrips.length > 0 &&
                <h3 className="mt-5 mb-3">Passed Trips</h3>
            }

            <Row xs={1} sm={2} xl={3} className="g-4">
                {passedTrips.map((trip) => (
                    <Col key={trip.id}>
                        <TripCard
                            name={trip.name}
                            dateRange={formatTripDates(trip.startDate, trip.endDate)}
                            duration={getTripDuration(trip.startDate, trip.endDate)}
                            countdown={getCountdown(trip.startDate, trip.endDate)}
                            image={background}
                            onClick={() => navigate(`/trips/${trip.id}`)}
                        />
                    </Col>
                ))}
            </Row>

            <CreateTripModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onCreated={loadTrips}
            />
        </Container>
    );
}

export default TripPage;