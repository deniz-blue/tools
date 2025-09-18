import { Group, Stack, Text, Code, Select } from '@mantine/core'
import { useState } from "react";
import { ValueCopyButton } from "../../app/components/ui/ValueCopyButton";
import { DateTimePicker } from "@mantine/dates";
import type { ToolInfo } from "../tool";
import { IconMessageCode } from "@tabler/icons-react";
import { ResultsTable } from "../components/ui/ResultsTable";

export const info: ToolInfo = {
    id: "discord-timestamp",
    name: "Discord Timestamp Markdown",
    icon: IconMessageCode,
};

interface TsFormat {
    label: string;
    code: string;
    fmt_dt?: Intl.DateTimeFormatOptions;
    fmt_r?: Intl.RelativeTimeFormatOptions;
};

const FORMATS = [
    {
        code: "R" as const,
        label: "Relative",
        fmt_r: { style: "long", numeric: "auto" },
    },
    {
        code: "t" as const,
        label: "Short Time",
        fmt_dt: { timeStyle: "short" },
    },
    {
        code: "T" as const,
        label: "Long Time",
        fmt_dt: { timeStyle: "medium" },
    },
    {
        code: "d" as const,
        label: "Short Date",
        fmt_dt: { dateStyle: "short" },
    },
    {
        code: "D" as const,
        label: "Long Date",
        fmt_dt: { dateStyle: "long" },
    },
    {
        code: "f" as const,
        label: "Long Date, Short Time",
        fmt_dt: { dateStyle: "long", timeStyle: "short" },
    },
    {
        code: "F" as const,
        label: "Full Date, Short Time",
        fmt_dt: { dateStyle: "full", timeStyle: "short" },
    },
] satisfies TsFormat[];

const findRelativeUnit = (timestamp: number) => {
    const now = Date.now();
    const diffSeconds = Math.floor((timestamp - now) / 1000);
    const absDiff = Math.abs(diffSeconds);

    const units: { seconds: number; name: Intl.RelativeTimeFormatUnit }[] = [
        { seconds: 86400 * 365, name: "years" },
        { seconds: 86400 * 30, name: "months" },
        { seconds: 86400, name: "days" },
        { seconds: 3600, name: "hours" },
        { seconds: 60, name: "minutes" },
    ];

    for (const { seconds, name } of units) {
        if (absDiff >= seconds) {
            return {
                duration: Math.round(diffSeconds / seconds),
                unit: name,
            };
        }
    }

    return { duration: diffSeconds, unit: "seconds" as Intl.RelativeTimeFormatUnit };
};

const tsmd = (ts: number, sx: string) => `<t:${ts.toString().substring(0, ts.toString().length - 3)}:${sx}>`;

export default function DiscordTimestampGenerator() {
    const [value, setValue] = useState(new Date());

    let utcTimestamp = new Date(value.getTime() + new Date().getTimezoneOffset() * 60000).getTime();

    const data: [string, string][] = [];

    for (let format of FORMATS) {
        let preview = "";

        if (format.fmt_dt)
            preview = new Intl.DateTimeFormat("en", format.fmt_dt).format(utcTimestamp);

        if (format.fmt_r) {
            const { duration, unit } = findRelativeUnit(utcTimestamp);
            preview = new Intl.RelativeTimeFormat("en", format.fmt_r).format(duration, unit);
        }

        data.push([
            preview,
            tsmd(utcTimestamp, format.code),
        ]);
    }

    return (
        <Stack align="center">
            <DateTimePicker
                label="Date/Time"
                value={value}
                onChange={(v) => v && setValue(new Date(v))}
                withSeconds
            />
            <ResultsTable
                data={data}
            />
        </Stack>
    );
}
