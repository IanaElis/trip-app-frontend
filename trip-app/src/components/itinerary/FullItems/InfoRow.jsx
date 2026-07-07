import { Row, Col } from "react-bootstrap";

function InfoRow({ label, value }) {

    return (
        <Row className="mb-3">
            <Col md={4}>
                <strong>{label}</strong>
            </Col>

            <Col md={8}>
                {value || "-"}
            </Col>
        </Row>
    );
}

export default InfoRow;