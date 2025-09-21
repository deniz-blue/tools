import { TZ_ABBREVIATIONS } from "./data";
import { isUTCRelative } from "./fmt";

export function getTimezoneOffsetMinutes(zone: string, date: Date = new Date()): number {
    let relativeString;

    if (isUTCRelative(zone)) {
        relativeString = zone;
    } else {
        const tz = TZ_ABBREVIATIONS[zone] ?? zone;

        if (!tz) throw new Error(`Unknown Timezone '${zone}'`);

        const dtf = new Intl.DateTimeFormat([], {
            timeZone: tz,
            timeZoneName: "longOffset",
        });

        let part = dtf.formatToParts(date).find(x => x.type == "timeZoneName");
        relativeString = part?.value || "UTC";
    }

    let str = relativeString.slice(3) || "+0";
    let sign = (str[0] == "+") ? 1 : -1;
    let [h, m] = str.slice(1).split(":");
    let offset = parseInt(h || "0") * 60 + parseInt(m || "0");
    return offset * sign;
}
