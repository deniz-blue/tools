import { TZ_ABBREVIATIONS } from "./data";

export function getTimezoneOffsetMinutes(zone: string, date: Date = new Date()): number {
    const tz = TZ_ABBREVIATIONS[zone] ?? zone;

    const dtf = new Intl.DateTimeFormat([], {
        timeZone: tz,
        timeZoneName: "longOffset",
    });

    let part = dtf.formatToParts(date).find(x => x.type == "timeZoneName");
    if(!part) return 0;

    console.log({ part })
    
    let str = part.value.slice(3) || "+0";
    let sign = (str[0] == "+") ? 1 : -1;
    let [h, m] = str.slice(1).split(":");
    let offset = parseInt(h || "0")*60 + parseInt(m || "0");
    return offset * sign;
}
