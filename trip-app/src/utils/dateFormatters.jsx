export const formatToWeekdayDayMonthYear = (date) => {
       if (!date) return "-";

        return new Intl.DateTimeFormat(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date));
}