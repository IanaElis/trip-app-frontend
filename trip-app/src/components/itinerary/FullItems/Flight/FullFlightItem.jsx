import FullItemCard from "../FullItemCard";
import InfoRow from "../InfoRow";

function FullFlightItem({ item, onBack, onEdit, onDelete }) {

    return (
        <FullItemCard item={item} title="Flight" onBack={onBack}
        onEdit={onEdit} onDelete={onDelete}>
            <InfoRow
                label="Airline"
                value={`${item.airline?.name} (${item.airline?.iataCode})`}
            />
            <InfoRow
                label="Flight Number"
                value={item.flightNumber}
            />
            <InfoRow
                label="Confirmation"
                value={item.confirmationNumber}
            />
            <hr />
            <InfoRow
                label="Departure Airport"
                value={item.departureAirport?.name}
            />
            <InfoRow
                label="Departure Address"
                value={item.departureAirport?.formattedAddress}
            />
            <InfoRow
                label="Arrival Airport"
                value={item.arrivalAirport?.name}
            />
            <InfoRow
                label="Arrival Address"
                value={item.arrivalAirport?.formattedAddress}
            />

        </FullItemCard>
    );
}

export default FullFlightItem;