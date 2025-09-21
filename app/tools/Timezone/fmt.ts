import { TZ_ABBREVIATIONS, TZ_IANA } from "./data";

export const isIANATimezone = (tz: string) => TZ_IANA.includes(tz);
export const isAbbrTimezone = (tz: string) => !!TZ_ABBREVIATIONS[tz];
export const isUTCRelative = (tz: string) => /^(UTC|GMT)([+-])(\d{1,2})(?::([0-5]\d))?$/.test(tz);
export const isValidTimezone = (tz: string) => isIANATimezone(tz) || isUTCRelative(tz) || isAbbrTimezone(tz);

export const fmtOffset = (offsetMinutes: number) => {
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;

    return minutes === 0
        ? (hours === 0 ? "UTC" : `UTC${sign}${hours}`)
        : `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
};
