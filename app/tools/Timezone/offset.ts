import { TZ_ABBREVIATIONS } from "./data";
import { isUTCRelative } from "./fmt";

export interface DSTChange {
    startsAt: number;
    endsAt?: number;
    utcOffset: number;
};

export const getTimezoneInfo = (zone: string) => {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const xDate = (day: number) => new Date(
        new Date("2000-01-01T00:00Z").getTime() + ONE_DAY*day
    );

    let info: DSTChange[] = [
        {
            startsAt: xDate(0).getTime(),
            utcOffset: getTimezoneOffsetMinutes(zone, xDate(0)),
        },
    ];
    for (let i = 0; i < 356; i++) {
        let date = xDate(i);
        let offset = getTimezoneOffsetMinutes(zone, date);
        if(offset !== info[info.length-1].utcOffset) {
            info.push({
                startsAt: date.getTime(),
                utcOffset: offset,
            });
        }
    }

    
    info.forEach((block, i) => {
        if(!!info[i+1]) {
            block.endsAt = new Date(new Date(info[i+1].startsAt).getTime() - ONE_DAY).getTime();
        } else {
            block.endsAt = xDate(365).getTime();
        }
    });

    return info;
};

export const localDateToTzDate = (zone: string, date: Date = new Date()) => {
    const localTzOffset = new Date().getTimezoneOffset();
    return new Date(date.getTime() + localTzOffset * 60 * 1000 + getTimezoneOffsetMinutes(zone) * 60 * 1000);
};

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
