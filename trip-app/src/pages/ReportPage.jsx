import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import { itineraryItemsApi, buildTimeline, groupEventsByDay } from "../services/itineraryService"
import ReportHeader from "../components/report/ReportHeader";
import ReportItem from "../components/report/ReportItem";
import "./ReportPage.css"

function ReportPage() {
    const { tripId } = useParams();
    const [report, setReport] = useState({ items: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await itineraryItemsApi.getReport(tripId);
            console.log(data);
            setReport(data);
            setLoading(false);
        }
        load();
    }, [tripId]);

    if (loading)
        return <Spinner animation="border" />;


    const events = buildTimeline(report.items);
    const dayGroups = groupEventsByDay(events);

    function formatDate(date) {
        if (!date) return "-";

        return new Intl.DateTimeFormat(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date));
    }


    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between mb-4">
                <h1>Trip Report</h1>
                <Button onClick={() => window.print()}>
                    Print
                </Button>
            </div>

            <ReportHeader trip={report.trip} />
            <h3 className="mb-3">
                Itinerary
            </h3>
            {dayGroups.map(day => (
                <div key={day.date} className="report-day">

                    <div className="report-day-header">
                        {formatDate(day.date)}
                    </div>

                    {day.events.map(event => (
                        <ReportItem
                            key={event.id}
                            item={event.item}
                        />
                    ))}

                </div>
            ))}
        </Container>

    );
}

export default ReportPage;