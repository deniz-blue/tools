import { useState } from "react";
import { ResultsTable } from "../../components/output/ResultsTable";
import { TimezoneSelect } from "./TimezoneSelect";
import { fmtOffset } from "./fmt";
import { getTimezoneOffsetMinutes } from "./offset";
import { Stack } from "@mantine/core";

export const TimezoneUTCRelative = () => {
    const [offsetTz, setOffsetTz] = useState<string | null>(null);
    const localTzOffset = new Date().getTimezoneOffset();
    const tzCurrentTime = !offsetTz ? "" : (
        new Date(Date.now() + localTzOffset * 60 * 1000 + getTimezoneOffsetMinutes(offsetTz) * 60 * 1000)
            .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
    );

    return (
        <Stack>
            <ResultsTable
                data={[
                    [
                        (
                            <TimezoneSelect
                                value={offsetTz}
                                onChange={setOffsetTz}
                            />
                        ),
                        !offsetTz ? "" : fmtOffset(getTimezoneOffsetMinutes(offsetTz)),
                        { valueProps: { fz: "lg" } },
                    ],
                    offsetTz ? [
                        `Current Time in ${offsetTz}`,
                        tzCurrentTime,
                    ] : null,
                ]}
            />
        </Stack>
    );
};
