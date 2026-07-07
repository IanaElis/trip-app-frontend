import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { itineraryItemsApi } from "../../../../services/itineraryService";
import DateTimePickerField from "../../../DateTimePickerField";
import { useParams } from "react-router-dom";
import PlaceAutocompleteInput from "../../../map/PlaceAutocompleteInput";

function EditActivityModal({ show, onHide, onUpdated, item }) {
    const {tripId} = useParams();

    const [form, setForm] = useState({
        startDateTime: "",
        endDateTime: "",
        notes: "",
        title: "",
        description: "",
        location: null
    });

    useEffect(() => {
        if (!item) return;

        setForm({
            startDateTime: item.startDateTime || "",
            endDateTime: item.endDateTime || "",
            notes: item.notes || "",
            title: item.title || "",
            description: item.description || "",
            location:                 item.location
                    ? {
                        googlePlaceId: item.location.googlePlaceId,
                        name: item.location.name,
                        address: item.location.formattedAddress || item.location.address,
                        city: item.location.city,
                        country: item.location.country,
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        timezoneId: item.location.timezoneId
                    }
                    : null,
        });
    }, [item]);

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await itineraryItemsApi.updateActivity(tripId, item.id, {
            ...form,
            startDateTime: new Date(form.startDateTime).toISOString(),
            endDateTime: new Date(form.endDateTime).toISOString()
        });

        onUpdated?.();
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Activity</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

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
                        <PlaceAutocompleteInput
                            value={form.location?.address ?? ""}
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
                            }}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <DateTimePickerField
                                label="Start"
                                value={form.startDateTime}
                                onChange={(date) =>
                                    setForm(prev => ({
                                        ...prev,
                                        startDateTime: date
                                    }))
                                }
                            />
                        </Col>

                        <Col>
                            <DateTimePickerField
                                label="End"
                                value={form.endDateTime}
                                onChange={(date) =>
                                    setForm(prev => ({
                                        ...prev,
                                        endDateTime: date
                                    }))
                                }
                            />
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

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditActivityModal;