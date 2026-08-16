import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { itineraryItemsApi } from "../../../../services/itineraryService";
import { carriersApi } from "../../../../services/carrierService";
import Select from "react-select";
import DateTimePickerField from "../../../DateTimePickerField";
import { useParams } from "react-router-dom";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import PlaceAutocompleteInput from "../../../map/PlaceAutocompleteInput";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

function EditFlightModal({ show, onHide, onUpdated, item }) {
    const [airlines, setAirlines] = useState([]);
    const [error, setError] = useState("");
    const { tripId } = useParams();

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
            const data = await carriersApi.getAirlines();
            setAirlines(data);
        }
        load();
    }, []);


    const airlineOptions = airlines.map(a => ({
        value: a.iataCode,
        label: a.name
    }));



    useEffect(() => {
        if (!item) return;

        setForm({
            startDateTime: toZonedTime(item.startDateTime, item.departureAirport.timezoneId) || "",
            endDateTime: toZonedTime(item.endDateTime, item.arrivalAirport.timezoneId) || "",
            notes: item.notes || "",
            confirmationNumber: item.confirmationNumber || "",
            airlineIataCode: item.airline?.iataCode || "",
            departureAirport: item.departureAirport
                ? {
                    googlePlaceId: item.departureAirport.googlePlaceId,
                    name: item.departureAirport.name,
                    address: item.departureAirport.formattedAddress || item.departureAirport.address,
                    city: item.departureAirport.city,
                    country: item.departureAirport.country,
                    latitude: item.departureAirport.latitude,
                    longitude: item.departureAirport.longitude,
                    timezoneId: item.departureAirport.timezoneId
                }
                : null,
            arrivalAirport: item.arrivalAirport
                ? {
                    googlePlaceId: item.arrivalAirport.googlePlaceId,
                    name: item.arrivalAirport.name,
                    address: item.arrivalAirport.formattedAddress || item.arrivalAirport.address,
                    city: item.arrivalAirport.city,
                    country: item.arrivalAirport.country,
                    latitude: item.arrivalAirport.latitude,
                    longitude: item.arrivalAirport.longitude,
                    timezoneId: item.arrivalAirport.timezoneId
                }
                : null,
            flightNumber: item.flightNumber || ""
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
        console.log(fromZonedTime(form.startDateTime, form.departureAirport.timezoneId).toISOString());
        try {
            await itineraryItemsApi.updateFlight(tripId, item.id, {
                ...form,
                startDateTime: fromZonedTime(form.startDateTime, form.departureAirport.timezoneId).toISOString(),
                endDateTime: fromZonedTime(form.endDateTime, form.arrivalAirport.timezoneId).toISOString()
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
                <Modal.Title>Edit Flight</Modal.Title>
            </Modal.Header>

            {error &&
                <Alert variant="danger">
                    {error}
                </Alert>
            }

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>Airline</Form.Label>
                        <Select
                            options={airlineOptions}
                            value={airlineOptions.find(o => o.value === form.airlineIataCode)}
                            onChange={(selected) =>
                                setForm(prev => ({
                                    ...prev,
                                    airlineIataCode: selected?.value || ""
                                }))
                            }
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
                        <Form.Label>Departure</Form.Label>
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
                        <Form.Label>Arrival</Form.Label>
                        <PlaceAutocompleteInput
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
                            <DateTimePickerField
                                label="Departure"
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
                                label="Arrival"
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

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmation</Form.Label>
                        <Form.Control
                            name="confirmationNumber"
                            value={form.confirmationNumber}
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

export default EditFlightModal;