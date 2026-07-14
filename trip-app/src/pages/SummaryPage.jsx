import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { itineraryItemsApi, buildTimeline, groupEventsByDay } from "../services/itineraryService"
import SummaryHeader from "../components/summary/SummaryHeader";
import SummaryItem from "../components/summary/SummaryItem";
import "./SummaryPage.css"
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { formatToWeekdayDayMonthYear } from "../utils/dateFormatters";

function SummaryPage() {
    const { tripId } = useParams();
    const [summary, setSummary] = useState({ items: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await itineraryItemsApi.getSummary(tripId);
                setSummary(data);
            } catch (err) {
                setError(extractErrorMessage(err, "Failed to load trip summary"));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [tripId]);

    if (loading)
        return <Spinner animation="border" className="align-center" />;


    const events = buildTimeline(summary.items);
    const dayGroups = groupEventsByDay(events);




    return (
        <Container className="py-4">
            <div className="trip-back-link mb-2 d-flex align-start">
                <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={() => navigate(`/trips/${tripId}`)}>
                    ← Back to trip
                </Button>
            </div>

            <div className="d-flex justify-content-between mb-4">
                <h1>Trip Summary</h1>
                <Button onClick={() => window.print()}> Print </Button>
            </div>

            <SummaryHeader trip={summary.trip} />
            <h3 className="mb-3"> Itinerary </h3>

            {dayGroups.map(day => (
                <div key={day.date} className="report-day">

                    <div className="report-day-header">
                        {formatToWeekdayDayMonthYear(day.date)}
                    </div>

                    {day.events.map(event => (
                        <SummaryItem
                            key={event.id}
                            item={event.item}
                        />
                    ))}
                </div>
            ))}
        </Container>
    );
}

export default SummaryPage;