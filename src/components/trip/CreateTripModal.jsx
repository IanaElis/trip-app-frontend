import { Modal, Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { tripsApi, toTripStartUtc, toTripEndUtc } from "../../services/tripService";
import PlaceAutocompleteInput from "../map/PlaceAutocompleteInput";
import { extractErrorMessage } from "../../utils/extractErrorMessage"

function CreateTripModal({ show, onHide, onCreated }) {
    const initialForm = {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        destination: null
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState(initialForm);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (show) {
            setForm(initialForm);
            setError("");
            setLoading(false);
        }
    }, [show]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const start = toTripStartUtc(form.startDate);
        const end = toTripEndUtc(form.endDate);
        try {
            await tripsApi.createTrip({
                ...form,
                startDate: start,
                endDate: end
            });
            onCreated?.();
            onHide();
        } catch (err) {
            setError(extractErrorMessage(err, "smth went wrong"));
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal show={show} onHide={onHide} centered>

            <Modal.Header closeButton>
                <Modal.Title>Create Trip</Modal.Title>
            </Modal.Header>

            {error &&
                <Alert variant="danger">
                    {error}
                </Alert>
            }

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip name</Form.Label>
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
                            }}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Start date</Form.Label>
                                <Form.Control
                                    name="startDate"
                                    type="date"
                                    value={form.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>End date</Form.Label>
                                <Form.Control
                                    name="endDate"
                                    type="date"
                                    value={form.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="g-2 mt-2 justify-content-end">
                        <Col xs="auto">
                            <Button variant="secondary" onClick={onHide}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit"
                                disabled={!form.destination}>
                                Create Trip
                            </Button></Col>
                    </Row>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default CreateTripModal;