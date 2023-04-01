export default function EventTime({ datetime }) {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return <span>{formattedDate}</span>;
}