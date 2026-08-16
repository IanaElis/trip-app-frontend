import { Card, Button, Row, Col } from "react-bootstrap";
import { formatTripDates } from "../../../services/tripService";

function FullItemCard({ item, title, children, onEdit, onDelete, onBack }) {

    const itemN = item;
    function getItemInfo() {
        switch (item.itemType) {
            case "ACCOMMODATION": return {
                timezone1: item.location?.timezoneId,
                timezone2: null
            }
            case "FLIGHT": return {
                timezone1: item.departureAirport?.timezoneId,
                timezone2: item.arrivalAirport?.timezoneId
            }
            case "TRANSPORT": return {
                timezone1: item.departureLocation?.timezoneId,
                timezone2: item.arrivalLocation?.timezoneId
            }
            case "ACTIVITY": return {
                timezone1: item.location?.timezoneId,
                timezone2: null
            }
            default:
                return { timezone1: Intl.DateTimeFormat().resolvedOptions().timeZone, 
                    timezone2: null}

        }
    }

    const { timezone1, timezone2 } = getItemInfo();

    const formatTime = (dateTime, timeZone) => {
        if (!dateTime) return "";
        if (!timeZone) return "";
        return new Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone,
            timeZoneName: "short"
        }).format(new Date(dateTime));
    }

    return (
        <>
            <Row xs="auto">
                <div className="trip-back-link mb-1 mt-1">
                    <Button variant="link" className="p-0 text-decoration-none"
                        onClick={onBack}> ← Back to trip
                    </Button>
                </div>
            </Row>
            <Card className="shadow-sm mt-4">
                <Card.Body>
                    <h2 className="mb-4"> {title} </h2>
                    <Row className="mb-3">
                        <Col md={4}> <strong>Start</strong> </Col>
                        <Col>
                            { formatTime(item.startDateTime, timezone1) }
                        </Col>
                    </Row>
                    <Row className="mb-4 ">
                        <Col md={4}> <strong>End</strong> </Col>
                        <Col>
                            { formatTime(item.endDateTime, timezone2 ?? timezone1) }
                        </Col>
                    </Row>

                    {children}

                    <hr />

                    <Row className="mb-4 ">
                        <Col md={4}> <strong>Notes</strong> </Col>
                        <Col>
                            {item.notes || "-"}
                        </Col>
                    </Row>

                    <hr />

                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <Button variant="outline-primary" onClick={onEdit} >
                            Edit
                        </Button>
                        <Button variant="outline-danger" onClick={onDelete} >
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default FullItemCard;