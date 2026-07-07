import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { itineraryItemsApi} from "../../../../services/itineraryService"
import DateTimePickerField from "../../../DateTimePickerField";
import { useParams } from "react-router-dom";
import PlaceAutocompleteInput from "../../../map/PlaceAutocompleteInput";

function EditAccommodationModal({ show, onHide, item, onUpdated }) {
    const {tripId} = useParams();

    const [form, setForm] = useState({
        startDateTime: "",
        endDateTime: "",
        notes: "",
        reservationNumber: "",
        location: null,
    });

    useEffect(() => {
        if (!item) return;

        setForm({
            startDateTime: item.startDateTime ? item.startDateTime.substring(0, 16) : "",
            endDateTime: item.endDateTime ? item.endDateTime.substring(0, 16) : "",
            notes: item.notes || "",
            reservationNumber: item.reservationNumber || "",
            location: item.location
                    ? {
                        googlePlaceId:item.location.googlePlaceId,
                        name:item.location.name,
                        address:item.location.formattedAddress ||item.location.address,
                        city:item.location.city,
                        country:item.location.country,
                        latitude:item.location.latitude,
                        longitude:item.location.longitude,
                        timezoneId:item.location.timezoneId
                    }
                    : null,
            locationName: item.location?.name || ""
        });
    }, [item]);

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handlePlaceSelect(place) {
        setForm(prev => ({
            ...prev,
            location: place,
            locationName: place.formatted_address || place.name || ""
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await itineraryItemsApi.updateAccommodation(tripId ,item.id, {
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
                <Modal.Title>Edit Accommodation</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
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
                            }}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <DateTimePickerField
                                label="Check-in"
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
                                label="Check-out"
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
                        <Form.Label>Reservation Number</Form.Label>
                        <Form.Control
                            name="reservationNumber"
                            value={form.reservationNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
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
                        Save changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditAccommodationModal;