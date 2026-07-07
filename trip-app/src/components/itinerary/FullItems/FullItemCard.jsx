import { Card, Button, Row, Col } from "react-bootstrap";
import { formatTripDates } from "../../../services/tripService";

function FullItemCard({ item, title, children, onEdit, onDelete, onBack }) {

    function formatDateTime(date) {
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(date));

    }

    return (
        <>
            <Row xs="auto">
                <div className="trip-back-link mb-1 mt-1">
                    <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={onBack}>
                        ← Back to trip
                    </Button>
                </div>
            </Row>
            <Card className="shadow-sm mt-4">
                <Card.Body>
                    <h2 className="mb-4">
                        {title}
                    </h2>
                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Start</strong>
                        </Col>
                        <Col>
                            {
                                formatDateTime(item.startDateTime)
                            }
                        </Col>
                    </Row>
                    <Row className="mb-4 ">
                        <Col md={4}>
                            <strong>End</strong>
                        </Col>
                        <Col>
                            {
                                formatDateTime(item.endDateTime)
                            }
                        </Col>
                    </Row>

                    {children}

                    <hr />

                    <Row className="mb-4 ">
                        <Col md={4}>
                            <strong>Notes</strong>
                        </Col>

                        <Col>
                            {item.notes || "-"}
                        </Col>
                    </Row>

                    <hr />

                    <div className="d-flex justify-content-center gap-2 mt-4">

                        <Button
                            variant="outline-primary"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>

                        <Button
                            variant="outline-danger"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>

                    </div>

                </Card.Body>

            </Card>
        </>
    );
}

export default FullItemCard;