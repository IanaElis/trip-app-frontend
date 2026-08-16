import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { tripsApi, toTripStartUtc, toTripEndUtc } from "../../services/tripService";
import PlaceAutocompleteInput from "../map/PlaceAutocompleteInput";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

function EditTripModal({ show, onHide, trip, onUpdated }) {
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        destination: null,
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        if (trip) {
            setForm({
                name: trip.name || "",
                description: trip.description || "",
                destination: trip.destination
                    ? {
                        googlePlaceId: trip.destination.googlePlaceId,
                        name: trip.destination.name,
                        address: trip.destination.formattedAddress,
                        city: trip.destination.city,
                        country: trip.destination.country,
                        latitude: trip.destination.latitude,
                        longitude: trip.destination.longitude,
                        timezoneId: trip.destination.timezoneId
                    }
                    : null,
                startDate: trip.startDate ? trip.startDate.substring(0, 10) : "",
                endDate: trip.endDate ? trip.endDate.substring(0, 10) : ""
            });
        }
    }, [trip]);


    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const start = toTripStartUtc(form.startDate);
        const end = toTripEndUtc(form.endDate);
        try {
            await tripsApi.updateTrip(trip.id, {
                ...form,
                startDate: start,
                endDate: end
            });
            onUpdated?.();
            onHide();
        } catch (err) {
            setError(extractErrorMessage(err, "Error"));
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Trip</Modal.Title>
            </Modal.Header>

            {error &&
                <Alert variant="danger">
                    {error}
                </Alert>
            }

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Destination</Form.Label>
                        <PlaceAutocompleteInput
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    destination: {
                                        googlePlaceId: place.googlePlaceId,
                                        name: place.name,
                                        address: place.formattedAddress,
                                        city: place.city,
                                        country: place.country,
                                        latitude: place.latitude,
                                        longitude: place.longitude,
                                        timezoneId: place.timezoneId
                                    }
                                }))
                            }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Save changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditTripModal;