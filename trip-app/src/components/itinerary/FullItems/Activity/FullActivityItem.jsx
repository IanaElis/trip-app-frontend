import FullItemCard from "../FullItemCard";
import InfoRow from "../InfoRow";

function FullActivityItem({ item, onBack, onEdit, onDelete }) {

    return (
        <FullItemCard item={item} title={item.title} onBack={onBack}
        onEdit={onEdit} onDelete={onDelete}>
            <InfoRow
                label="Description"
                value={item.description}
            />
            <InfoRow
                label="Location"
                value={item.location?.name}
            />
            <InfoRow
                label="Address"
                value={item.location?.formattedAddress}
            />
        </FullItemCard>
    );
}

export default FullActivityItem;