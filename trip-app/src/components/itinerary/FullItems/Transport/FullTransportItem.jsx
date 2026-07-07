import FullItemCard from "../FullItemCard";
import InfoRow from "../InfoRow";

function FullTransportItem({ item, onBack, onEdit, onDelete }) {

    return (
        <FullItemCard item={item} title="Transport" onBack={onBack}
        onEdit={onEdit} onDelete={onDelete}>
            <InfoRow
                label="Transport Type"
                value={item.transportType}
            />
            <InfoRow
                label="Company"
                value={item.companyName}
            />
            <InfoRow
                label="Transport ID"
                value={item.transportId}
            />
            <InfoRow
                label="Confirmation"
                value={item.confirmationNumber}
            />
            <hr />
            <InfoRow
                label="Departure"
                value={item.departureLocation?.name}
            />
            <InfoRow
                label="Departure Address"
                value={item.departureLocation?.formattedAddress}
            />
            <InfoRow
                label="Arrival"
                value={item.arrivalLocation?.name}
            />
            <InfoRow
                label="Arrival Address"
                value={item.arrivalLocation?.formattedAddress}
            />

        </FullItemCard>
    );
}

export default FullTransportItem;