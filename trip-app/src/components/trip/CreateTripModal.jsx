import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { tripsApi } from "../../services/tripService";
import PlaceAutocompleteInput from "../map/PlaceAutocompleteInput";

function CreateTripModal({ show, onHide, onCreated }) {

    const [form, setForm] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        destination: null
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await tripsApi.createTrip({
            ...form,
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString()
        });
        onCreated?.();
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide} centered>

            <Modal.Header closeButton>
                <Modal.Title>Create Trip</Modal.Title>
            </Modal.Header>

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
                        {/* Google Places Autocomplete 
                            <Form.Control 
                            name="destination"
                            value={form.destination}
                             required/>*/}
                        <PlaceAutocompleteInput
                            value={form.destination?.formattedAddress ?? ""}
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