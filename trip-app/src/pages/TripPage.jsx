import { Button, Col, Container, Row } from "react-bootstrap";
import background from '../assets/background.jpg';
import TripCard from "../components/trip/TripCard/TripCard";
import { tripsApi } from "../services/tripService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatTripDates, getTripDuration, getCountdown } from "../services/tripService";
import AddTripCard from "../components/trip/AddTripCard";
import CreateTripModal from "../components/trip/CreateTripModal";


function TripPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    {/*let trip = { 
        id: 1,
        name: "Iceland Adventure", 
        startDate: "2024-07-01T08:00:00Z", 
        endDate: "2024-07-10T23:30:00Z" };
    */}
    const loadTrips = async () => {
        try {
            const data = await tripsApi.getAllTrips();
            setTrips(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrips();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className="py-4 px-4">
            <h1 className="mb-4 ms-4">Trip Page</h1>


            <Row xs={1} sm={2} xl={3} className="g-4">
                {trips.map((trip) => (
                    <Col key={trip.id}>
                        <TripCard
                            name={trip.name}
                            dateRange ={formatTripDates(trip.startDate, trip.endDate)}
                            duration={getTripDuration(trip.startDate, trip.endDate)}
                            countdown={getCountdown(trip.startDate, trip.endDate)}
                            image={background}
                            onClick={() => navigate(`/trips/${trip.id}`)}
                        />
                    </Col>
                ))}
                    <Col>
                    <AddTripCard onClick={() => setShowModal(true)}/>
                    </Col>

    <CreateTripModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onCreated={loadTrips}
            />
            </Row>
        </Container>
    );
}

export default TripPage;