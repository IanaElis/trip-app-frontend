import { Card, Row, Col } from "react-bootstrap";
import "./SummaryItem.css"

function formatDateTime(date) {
    if (!date) return "-";

    return new Intl.DateTimeFormat(undefined, {
      //  dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}


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




function SummaryItem({ item }) {

    function getItemInfo() {
        switch (item.itemType) {
            case "ACCOMMODATION": return {
                timezone: item.location?.timezoneId,
                title: item.location?.name || "Accommodation"}
            case "FLIGHT": return {
                timezone: item.departureAirport?.timezoneId || item.arrivalAirport?.timezoneId,
                title: `${item.departureAirport?.city ?? ""} (${item.departureAirport?.iataCode ?? ""})
             → ${item.arrivalAirport?.city ?? ""} (${item.arrivalAirport?.iataCode ?? ""})`}
            case "TRANSPORT": return {
                timezone: item.departureLocation?.timezoneId ||
            item.arrivalLocation?.timezoneId,
                title: `${item.transportType}${item.companyName ? ` • ${item.companyName}` : ""}`
            }
            case "ACTIVITY": return { timezone: item.location?.timezoneId,
                title: item.title || "Activity"}
            default:
                return {title: item.itemType,  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone}

        }
    }

    function renderContent() {

        switch (item.itemType) {

            case "FLIGHT":
                return (
                    <>
                        <div className="report-main">
                            {item.airline?.name} {item.flightNumber}
                        </div>

                        <div> Confirmation: {item.confirmationNumber || "-"} </div>

                        {item.notes && <div className="report-notes">{item.notes} </div>}
                    </>
                );
            case "ACCOMMODATION":
                return (
                    <>
                        <div>{item.location?.formattedAddress}</div>

                        {item.reservationNumber &&
                            <div>Reservation: {item.reservationNumber}</div>
                        }
                        {item.notes && <div className="report-notes">{item.notes}</div>}
                    </>
                );
            case "ACTIVITY":
                return (
                    <>
                        {item.location && <div>{item.location.name}</div>}

                        {item.description && <div>{item.description}</div>}

                        {item.notes && <div className="report-notes">{item.notes} </div>
                        }
                    </>
                );
            case "TRANSPORT":
                return (
                    <>
                        <div>
                            <strong>{item.departureLocation?.name}</strong>
                            {" → "}
                            <strong>{item.arrivalLocation?.name}</strong>
                        </div>

                        {item.transportId &&
                            <div>
                                Transport ID: {item.transportId}
                            </div>
                        }

                        {item.confirmationNumber &&
                            <div>
                                Confirmation: {item.confirmationNumber}
                            </div>
                        }

                        {item.notes &&
                            <div className="report-notes">
                                {item.notes}
                            </div>
                        }
                    </>
                );

            default:
                return null;
        }
    }

    const { title, timezone } = getItemInfo();

    return (
        <div className="report-item">

            <div className="report-time">
                {formatTime(item.startDateTime, timezone )}
            </div>

            <div className="report-content">

                <div className="report-title">
                    {title}
                </div>

                {renderContent()}

            </div>

        </div>
    );
}

export default SummaryItem;