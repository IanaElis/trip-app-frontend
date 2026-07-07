import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { itineraryItemsApi } from "../../../../services/itineraryService";
import { carriersApi } from "../../../../services/carrierService";
import DateTimePickerField from "../../../DateTimePickerField";
import { useParams } from "react-router-dom";
import PlaceAutocompleteInput from "../../../map/PlaceAutocompleteInput";

function EditTransportModal({ show, onHide, onUpdated, item }) {
    const [companies, setCompanies] = useState([]);
    const {tripId} = useParams();

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
        if (!item) return;

        setForm({
            startDateTime: item.startDateTime || "",
            endDateTime: item.endDateTime || "",
            notes: item.notes || "",
            confirmationNumber: item.confirmationNumber || "",
            companyId: item.companyId || null,
            companyName: item.companyName || "",
            type: item.transportType || "",
            departureLocation: item.departureLocation
                    ? {
                        googlePlaceId: item.departureLocation.googlePlaceId,
                        name: item.departureLocation.name,
                        address: item.departureLocation.formattedAddress || item.departureLocation.address,
                        city: item.departureLocation.city,
                        country: item.departureLocation.country,
                        latitude: item.departureLocation.latitude,
                        longitude: item.departureLocation.longitude,
                        timezoneId: item.departureLocation.timezoneId
                    }
                    : null,
                    arrivalLocation:item.arrivalLocation
                    ? {
                        googlePlaceId:item.arrivalLocation.googlePlaceId,
                        name:item.arrivalLocation.name,
                        address:item.arrivalLocation.formattedAddress ||item.arrivalLocation.address,
                        city:item.arrivalLocation.city,
                        country:item.arrivalLocation.country,
                        latitude:item.arrivalLocation.latitude,
                        longitude:item.arrivalLocation.longitude,
                        timezoneId:item.arrivalLocation.timezoneId
                    }
                    : null,
            transportIdentifier: item.transportId || "",
        });
    }, [item]);

    useEffect(() => {
        if (!form.type) return;

        const load = async () => {
            const data = await carriersApi.getCompaniesByType(form.type);
            setCompanies(data);
        };

        load();
    }, [form.type]);

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await itineraryItemsApi.updateTransport(tripId, item.id, {
            ...form,
            startDateTime: new Date(form.startDateTime).toISOString(),
            endDateTime: new Date(form.endDateTime).toISOString(),
        });

        onUpdated?.();
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transport</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

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
                            value={form.companyName}
                            list="company-list"
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    companyName: e.target.value,
                                    companyId: null
                                }))
                            }
                        />

                        <datalist id="company-list">
                            {companies.map(c => (
                                <option key={c} value={c} />
                            ))}
                        </datalist>
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
                        <Form.Label>Departure</Form.Label>
                        <PlaceAutocompleteInput
                            value={form.departureLocation?.formattedAddress ?? ""}
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
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Arrival</Form.Label>
   <PlaceAutocompleteInput
                            value={form.arrivalLocation?.formattedAddress ?? ""}
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
                            }}
                        />
                    </Form.Group>

                    <Row className="g-2 mb-3">
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

                    <Form.Group className="mb-3">
                        <Form.Label>Transport ID</Form.Label>
                        <Form.Control
                            name="transportIdentifier"
                            value={form.transportIdentifier}
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

export default EditTransportModal;