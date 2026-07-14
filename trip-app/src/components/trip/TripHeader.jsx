import {Card,Container, Button, CardBody, CardImg, CardImgOverlay, 
    Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import { formatTripDates, getTripDuration } from "../../services/tripService";
import image from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { ThreeDotsVertical, PlusLg } from "react-bootstrap-icons";
import "./TripHeader.css"

function TripHeader({trip, onEdit, onDelete, onAddItem, onPrint}) {
    const navigate = useNavigate();

     function handleMoreActions(key) {
        switch(key) {
            case "print":
                onPrint();
                break;

            case "delete":
                onDelete();
                break;
        }
    }

    return(
        <>
              <Card className="trip-header-card mb-4 shadow-sm position-relative">
                <Card.Img src={image} alt="Trip" />
                <Card.ImgOverlay className="d-flex flex-column p-4">
                    <Row className="align-items-stretch">
                        <Row xs="auto">
                            <div className="trip-back-link mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none"
                                    onClick={() => navigate("/trips")}>
                                    ← All Trips
                                </Button>
                            </div>
                        </Row>
                        <Col xs={11} md={6} lg={9} className="text-start text-white
                        d-flex flex-column justify-content-center">

                            <h2 className="trip-name mb-2 text-white">
                                {trip.name}
                            </h2>

                            <div className="trip-dates mb-1">
                                📅 {formatTripDates(trip.startDate, trip.endDate)}
                            </div>

                            <div className="trip-duration mb-1">
                                ⏳ {getTripDuration(trip.startDate, trip.endDate)} days
                            </div>

                            <div className="trip-destination">
                                🌍 {trip.destination?.name}
                            </div>
                        </Col>

                        {/*BUTTONS DESKTOP */}
                        <Col lg={3} md={6}
                            className="d-none d-md-flex flex-column align-items-end">
                            <div className="w-100 trip-actions mt-2">

                                <div className="trip-top-actions">
                                    <Button variant="outline-light" onClick={onEdit}>
                                        Edit Trip
                                    </Button>

                                    <Dropdown onSelect={handleMoreActions}>
                                        <Dropdown.Toggle as={Button}
                                            variant="outline-light"
                                            className="w-100">
                                            More
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item eventKey="print">
                                                Print Trip</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item eventKey="delete"
                                                className="text-danger">
                                                Delete Trip</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <DropdownButton variant="primary"
                                    title="Add Item" className="add-item-dropdown w-100"
                                    onSelect={onAddItem}>
                                    <Dropdown.Item eventKey="accommodation">
                                        Accommodation</Dropdown.Item>
                                    <Dropdown.Item eventKey="flight">
                                        Flight</Dropdown.Item>
                                    <Dropdown.Item eventKey="transport">
                                        Transport</Dropdown.Item>
                                    <Dropdown.Item eventKey="activity">
                                        Activity</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Col>
                        {/*END BUTTONS DESKTOP*/}

                        {/*MOBILE*/}
                        <Col xs={1} md={3} className="d-lg-none d-md-none align-item-end">
                            <Dropdown align="end" onSelect={handleMoreActions}>
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-white p-0 border-0">
                                    <ThreeDotsVertical className="three-dots" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={onEdit}>Edit Trip</Dropdown.Item>
                                    <Dropdown.Item eventKey="print">Print Trip</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="text-danger"
                                        eventKey="delete">Delete Trip</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/*END OF MOBILE */}
                    </Row>
                </Card.ImgOverlay>
            </Card>


            <Dropdown drop="up" onSelect={onAddItem}>
                <Dropdown.Toggle
                    className="fab-add-item d-md-none align-items-center"
                    variant="primary" >
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="accommodation">Accommodation</Dropdown.Item>
                    <Dropdown.Item eventKey="flight">Flight</Dropdown.Item>
                    <Dropdown.Item eventKey="transport">Transport</Dropdown.Item>
                    <Dropdown.Item eventKey="activity">Activity</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


            

        </>
    );
}

export default TripHeader;