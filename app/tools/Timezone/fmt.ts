export const fmtOffset = (offsetMinutes: number) => {
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;

    return minutes === 0
        ? (hours === 0 ? "UTC" : `UTC${sign}${hours}`)
        : `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
};
