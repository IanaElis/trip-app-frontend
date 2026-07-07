import { Card, Row, Col } from "react-bootstrap";
import "./ReportItem.css"

function formatDateTime(date) {
    if (!date) return "-";

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}



function ReportItem({ item }) {

    function getTitle() {
        switch (item.itemType) {
            case "ACCOMMODATION":
                return item.location?.name || "Accommodation";
            case "FLIGHT":
                return `${item.departureAirport?.city ?? ""} (${item.departureAirport?.iataCode ?? ""})
             → ${item.arrivalAirport?.city ?? ""} (${item.arrivalAirport?.iataCode ?? ""})`;
            case "TRANSPORT":
                return `${item.transportType}${item.companyName ? ` • ${item.companyName}` : ""}`;
            case "ACTIVITY":
                return item.title || "Activity";
            default:
                return item.itemType;
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

    return (
        <div className="report-item">

            <div className="report-time">
                {formatDateTime(item.startDateTime)}
            </div>

            <div className="report-content">

                <div className="report-title">
                    {getTitle()}
                </div>

                {renderContent()}

            </div>

        </div>
    );
}

export default ReportItem;