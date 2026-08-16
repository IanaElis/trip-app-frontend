import FullItemCard from "./FullItemCard";
import InfoRow from "./InfoRow";

function FullAccommodationItem({ item, onBack, onEdit, onDelete }) {

    return (
        <FullItemCard item={item} title={item.location.name}
        onBack={onBack} onEdit={onEdit} onDelete={onDelete}
        >
            <InfoRow
                label="Location"
                value={item.location?.name}
            />
            <InfoRow
                label="Address"
                value={item.location?.formattedAddress}
            />
            <InfoRow
                label="Reservation Number"
                value={item.reservationNumber}
            />
        </FullItemCard>
    );
}

export default FullAccommodationItem;