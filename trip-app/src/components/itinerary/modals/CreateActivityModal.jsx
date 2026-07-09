import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { itineraryItemsApi } from "../../../services/itineraryService";
import DateTimePickerField from "../../DateTimePickerField";
import PlaceAutocompleteInput from "../../map/PlaceAutocompleteInput";

function CreateActivityModal({ tripId, show, onHide, onCreated }) {

    const [form, setForm] = useState({
        startDateTime: "",
        endDateTime: "",
        notes: "",
        title: "",
        description: "",
        location: null,
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        await itineraryItemsApi.createActivity(tripId, {
            ...form,
            startDateTime: new Date(form.startDateTime).toISOString(),
            endDateTime: new Date(form.endDateTime).toISOString()
        });
        onCreated?.();
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide} centered>

            <Modal.Header closeButton>
                <Modal.Title>Add Activity</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={form.title}
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
                        <Form.Label>Location</Form.Label>
                        {/* Google Places Autocomplete */}
                        <PlaceAutocompleteInput
                            value={form.location?.formattedAddress ?? ""}
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    location: {
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
                            }}/>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <DateTimePickerField
                                    label="Starts"
                                    value={form.startDateTime}
                                    required
                                    onChange={(date) =>
                                        setForm(prev => ({
                                            ...prev,
                                            startDateTime: date
                                        }))
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <DateTimePickerField
                                    label="Ends"
                                    value={form.endDateTime}
                                    required
                                    onChange={(date) =>
                                        setForm(prev => ({
                                            ...prev,
                                            endDateTime: date
                                        }))
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="g-2 mt-2 justify-content-end">
                        <Col xs="auto">
                            <Button variant="secondary" onClick={onHide}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">
                                Create
                            </Button></Col>
                    </Row>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default CreateActivityModal;