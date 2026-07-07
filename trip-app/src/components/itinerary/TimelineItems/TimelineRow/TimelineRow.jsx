import { Row, Col } from "react-bootstrap";
import "./TimelineRow.css";

function TimelineRow({ time, timeZone, icon, title, details, onClick }) {

    const formatTime = (dateTime, timeZone) => {
        if (!dateTime) return "";
        if(!timeZone) return "";
       return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
        timeZoneName: "short"
    }).format(new Date(dateTime));
    }


    return (
        <Row className="itinerary-item mb-3" onClick={onClick}>
            <Col xs="auto" className="item-time">
                {formatTime(time, timeZone)}
            </Col>

            <Col xs="auto" className="item-icon">
                {icon}
            </Col>

            <Col xs={6} className="item-content text-start">
                <div className="item-title">
                    {title}
                </div>

                <div className="item-details">
                    {details.map((detail, index) => (
                        <div key={index}>{detail}</div>
                    ))}
                </div>
            </Col>

        </Row>
    );
}

export default TimelineRow;