import "./DaySeparator.css";

function DaySeparator({ date }) {
    const d = new Date(date);

     const formatted = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(d);

    return (
        <div className="day-separator">
            <span>
                {formatted}
            </span>
        </div>
    );
}

export default DaySeparator;