
 const ConvertDate = (date) => {
    const dateObject = new Date(date);
    const currentDate = Date.now();
    const minus = currentDate - dateObject.getTime();

    const times = [
      { label: "years", value: 365 * 24 * 60 * 60 * 1000 },
      { label: "months", value: 30 * 24 * 60 * 60 * 1000 },
      { label: "days", value: 24 * 60 * 60 * 1000 },
      { label: "hours", value: 60 * 60 * 1000 },
      { label: "minutes", value: 60 * 1000 },
      { label: "seconds", value: 1000 },
    ];

    if (minus < 1000) return "just now";

    for (const { label, value } of times) {
      if (minus > value) {
        const time = Math.floor(minus / value);
        return `${time} ${label}${time > 1 ? "s" : ""} ago`;
      }
    }
  };
  export default ConvertDate