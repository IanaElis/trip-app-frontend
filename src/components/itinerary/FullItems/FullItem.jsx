import FullAccommodationItem from "./FullAccommodationItem";
import FullTransportItem from "./Transport/FullTransportItem";
import FullActivityItem from "./Activity/FullActivityItem";
import FullFlightItem from "./Flight/FullFlightItem";

function FullItem({ item, onBack, onEdit, onDelete }) {
    const itemType = item?.itemType;

    switch (itemType) {
        case "ACCOMMODATION":
            return <FullAccommodationItem item={item} onBack={onBack} 
            onEdit={onEdit} onDelete={onDelete}/>;
        case "TRANSPORT":
            return <FullTransportItem item={item} onBack={onBack} onEdit={onEdit} onDelete={onDelete}/>;
        case "ACTIVITY":
            return <FullActivityItem item={item} onBack={onBack} onEdit={onEdit} onDelete={onDelete}/>;
        case "FLIGHT":
            return <FullFlightItem item={item} onBack={onBack} onEdit={onEdit} onDelete={onDelete}/>;
        default:
            return <p>Unknown item type: {item.itemType}...</p>;
    }
}

export default FullItem;