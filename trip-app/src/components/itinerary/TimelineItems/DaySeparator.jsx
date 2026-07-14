import "./DaySeparator.css";

function formatDate(date) {
    if (!date) return "-";

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "full"
    }).format(new Date(date));
}

function DaySeparator({ date }) {
   /* const d = new Date(date);

     const formatted = new Intl.DateTimeFormat(undefined, "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(d);
   */


    return (
        <div className="day-separator">
            <span>
                {formatDate(date)}
            </span>
        </div>
    );
}

export default DaySeparator;