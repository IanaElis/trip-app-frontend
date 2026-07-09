import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { itineraryItemsApi } from "../../../services/itineraryService";
import { carriersApi } from "../../../services/carrierService";
import DateTimePickerField from "../../DateTimePickerField";
import PlaceAutocompleteInput from "../../map/PlaceAutocompleteInput";

function CreateTransportModal({ tripId, show, onHide, onCreated }) {
    const [companies, setCompanies] = useState([]);

    const [form, setForm] = useState({
        startDateTime: "",
        endDateTime: "",
        notes: "",
        confirmationNumber: "",
        companyId: null,
        companyName: "",
        type: "",
        departureLocation: null,
        arrivalLocation: null,
        transportIdentifier: "",
    });


    useEffect(() => {
        if (!form.type) return;

        const load = async () => {
            const data = await carriersApi.getCompaniesByType(form.type);
            setCompanies(data);
        };

        load();
    }, [form.type]);


    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await itineraryItemsApi.createTransport(tripId, {
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
                <Modal.Title>Add Transport</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Transport type</Form.Label>
                        <Form.Select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option value="">Select type</option>
                            <option value="BUS">Bus</option>
                            <option value="CAR">Car</option>
                            <option value="TRAIN">Train</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>

                        <Form.Control
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    companyName: e.target.value,
                                    companyId: null
                                });
                            }}
                            list="company-list"
                        />

                        <datalist id="company-list">
                            {companies.length > 0 &&
                                companies.map(c => (
                                    <option key={c} value={c} />
                                ))}
                        </datalist>
                        {form.type && companies.length === 0 && (
                            <div className="text-muted small mt-1">
                                No saved companies for this transport type.
                                You can create a new one by typing it.
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmation number</Form.Label>
                        <Form.Control
                            name="confirmationNumber"
                            value={form.confirmationNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Departure Location</Form.Label>
                        {/* Google Places Autocomplete */}
                            <PlaceAutocompleteInput
                            value={form.departureLocation?.address ?? ""}
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    departureLocation: {
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

                    <Form.Group className="mb-3">
                        <Form.Label>Arrival Location</Form.Label>
                        {/* Google Places Autocomplete */}
                            <PlaceAutocompleteInput
                            value={form.arrivalLocation?.address ?? ""}
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    arrivalLocation: {
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

                    <Row className="g-2 mb-3">
                        <Col>
                            <Form.Group>
                                <DateTimePickerField
                                    label="Start date"
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
                                    label="End date"
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

                    <Form.Group className="mb-3">
                        <Form.Label>Transport Id</Form.Label>
                        <Form.Control
                            name="transportIdentifier"
                            value={form.transportIdentifier}
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

export default CreateTransportModal;