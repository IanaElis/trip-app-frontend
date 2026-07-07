import { Card, Row, Col } from "react-bootstrap";

function formatDate(date) {
    if (!date) return "-";

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium"
    }).format(new Date(date));
}

function ReportHeader({ trip }) {

    return (
        <Card className="mb-4 justify-content-left">
            <Card.Body>
                <h2 className="mb-3">{trip.name}</h2>

                <Row className="mb-2">
                    <Col md={3}>
                        <strong>Destination</strong>
                    </Col>
                    <Col>
                        {trip.destination?.name}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={3}>
                        <strong>Address</strong>
                    </Col>
                    <Col>
                        {trip.destination?.formattedAddress}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={3}>
                        <strong>Start</strong>
                    </Col>
                    <Col>{formatDate(trip.startDate)}
</Col>
                </Row>

                <Row className="mb-2">
                    <Col md={3}>
                        <strong>End</strong>
                    </Col>
                    <Col> {formatDate(trip.endDate)} </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <strong>Description</strong>
                    </Col>
                    <Col>
                        {trip.description || "-"}
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
}

export default ReportHeader;