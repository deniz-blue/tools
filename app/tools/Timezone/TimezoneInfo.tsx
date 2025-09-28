import { useState } from "react";
import { ResultsTable } from "../../components/output/ResultsTable";
import { TimezoneSelect } from "./TimezoneSelect";
import { fmtOffset } from "./fmt";
import { getTimezoneInfo, getTimezoneOffsetMinutes, localDateToTzDate } from "./offset";
import { Stack } from "@mantine/core";

export const TimezoneInfo = () => {
    const [selectedTz, setSelectedTx] = useState<string | null>(null);

    const tzCurrentTimeAsLocalDate = !selectedTz ? null : localDateToTzDate(selectedTz);

    const tzCurrentTime = tzCurrentTimeAsLocalDate?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const dst = !selectedTz ? [] : getTimezoneInfo(selectedTz);

    const dstTimeFmt = (ts: number) => {
        if(!selectedTz) return "-";
        return localDateToTzDate(selectedTz, new Date(ts)).toLocaleDateString([], {
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Stack>
            <ResultsTable
                data={[
                    [
                        (
                            <TimezoneSelect
                                value={selectedTz}
                                onChange={setSelectedTx}
                            />
                        ),
                        !selectedTz ? "" : fmtOffset(getTimezoneOffsetMinutes(selectedTz)),
                        { valueProps: { fz: "lg" } },
                    ],
                    tzCurrentTime ? [
                        `Current Time in ${selectedTz}`,
                        tzCurrentTime,
                    ] : null,

                    ...(dst.length > 1 ? dst : []).map((block) => (
                        [
                            `${dstTimeFmt(block.startsAt)} - ${dstTimeFmt(block.endsAt!)}`,
                            fmtOffset(block.utcOffset),
                        ] as [string, string]
                    )),
                ]}
            />
        </Stack>
    );
};
