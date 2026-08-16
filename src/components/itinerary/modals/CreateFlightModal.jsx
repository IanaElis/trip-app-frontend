import { Modal, Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { itineraryItemsApi } from "../../../services/itineraryService";
import { carriersApi } from "../../../services/carrierService";
import Select from "react-select"
import DateTimePickerField from "../../DateTimePickerField";
import PlaceAutocompleteInput from "../../map/PlaceAutocompleteInput";
import { fromZonedTime } from "date-fns-tz";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

function CreateFlightModal({ tripId, show, onHide, onCreated, onUpdated }) {
    const [airlines, setAirlines] = useState([]);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        startDateTime: "",
        endDateTime: "",
        notes: "",
        confirmationNumber: "",
        airlineIataCode: "",
        departureAirport: null,
        arrivalAirport: null,
        flightNumber: ""
    });


    useEffect(() => {
        const load = async () => {
            try {
                const data = await carriersApi.getAirlines();
                setAirlines(data);
            } catch (err) {
                setError(extractErrorMessage(err, "Failed to load airlines."));
            }
        };

        load();
    }, []);

    const airlineOptions = airlines.map(a => ({
        value: a.iataCode,
        label: a.name
    }));


    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await itineraryItemsApi.createFlight(tripId, {
                ...form,
                startDateTime: fromZonedTime(form.startDateTime, 
                    form.departureAirport.timezoneId).toISOString(),
                endDateTime: fromZonedTime(form.endDateTime, 
                    form.arrivalAirport.timezoneId).toISOString()
            });
            onCreated?.();
            onUpdated?.();
            onHide();
        } catch (err) {
            setError(extractErrorMessage(err, "Error"));
        }
    };


    return (
        <Modal show={show} onHide={onHide} centered>

            <Modal.Header closeButton>
                <Modal.Title>Add Flight</Modal.Title>
            </Modal.Header>

            {error &&
                <Alert variant="danger">
                    {error}
                </Alert>
            }

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Airline</Form.Label>
                        <Select
                            options={airlineOptions}
                            value={airlineOptions.find(o => o.value === form.airlineIataCode)}
                            onChange={(selected) =>
                                setForm({
                                    ...form,
                                    airlineIataCode: selected?.value || ""
                                })
                            }
                            placeholder="Search airline..."
                            isClearable
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flight Number</Form.Label>
                        <Form.Control
                            name="flightNumber"
                            value={form.flightNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Departure Airport</Form.Label>
                        {/* Google Places Autocomplete */}
                        <PlaceAutocompleteInput
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    departureAirport: {
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
                        <Form.Label>Arrival Airport</Form.Label>
                        {/* Google Places Autocomplete */}
                        <PlaceAutocompleteInput
                            value={form.arrivalAirport?.address ?? ""}
                            onPlaceSelect={(place) => {
                                setForm(prev => ({
                                    ...prev,
                                    arrivalAirport: {
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

                    <Row className="g-2 mb-3">
                        <Col>
                            <Form.Group>
                                <DateTimePickerField
                                    label="Departure Time"
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
                                    label="Arrival Time"
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
                        <Form.Label>Confirmation Number</Form.Label>
                        <Form.Control
                            name="confirmationNumber"
                            value={form.confirmationNumber}
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

export default CreateFlightModal;