import { Card } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";
import "./TripCard.css";

function TripCard( {
    name, dateRange,
    duration, countdown, image, onClick
    }) {
    return (
        <>
            <Card className="trip-card border-0 shadow" 
            onClick={onClick}
            >
                <Card.Img variant="top" src={image} className="trip-image" alt="image" />
                <div className="trip-overlay">
                    <h5>{name}</h5>

                    <div className="d-flex justify-content-between align-items-center gap-1">
                        <span>{dateRange}</span>
                        <span>({duration} days)</span>
                    </div>

                  {/*  if(countdown != null) { */}
                        <div className="countdown">
                            <Clock size={14} className="me-1" />
                            {countdown}
                        </div>
                    
                </div>
                {/*<Card.ImgOverlay className="trip-overlay">
                    <Card.Title className="trip-title">{name}</Card.Title>
                    <Card.Text className="d-flex justify-content-between align-items-center
                    white-space-nowrap">
                           <span>{dateRange}</span>
                           <span>({duration} days)</span>
                    </Card.Text>
                    <Card.Text as="small" className="countdown">
                        <Clock size={14} className="me-1" />{countdown}
                    </Card.Text>
                </Card.ImgOverlay>
                */}

                {/* <div className="trip-overlay">
                    <h5 className="mb-1 fw-bold">{name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <small>
                            {startDate} – {endDate} <span className="opacity-75">
                                ({duration} days)</span>
                        </small>

                        <small className="countdown">
                            <Clock size={14} className="me-1" />
                            Starts in {countdown} days
                        </small>
                    </div>
                </div> */}
            </Card>
        </>
    );
}

export default TripCard;
