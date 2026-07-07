import { Card } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import "./AddTripCard.css";

function AddTripCard({ onClick }) {
    return (
        <Card className="add-trip-card" onClick={onClick}>
            <div className="add-trip-content">
                <PlusLg size={40} />
                <h5 className="mt-3 mb-1">Create Trip</h5>
                <small>Start planning your next adventure</small>
            </div>
        </Card>
    );
}

export default AddTripCard;