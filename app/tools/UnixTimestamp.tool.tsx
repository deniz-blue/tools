import { Button, Code, Group, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import type { ToolInfo } from "../tool";
import { IconTimeDuration0 } from "@tabler/icons-react";
import { ResultsTable } from "../components/output/ResultsTable";
import { TimestampInput } from "../components/input/TimestampInput";

export const info: ToolInfo = {
    id: "unix-timestamp",
    name: "Unix Timestamp",
    icon: IconTimeDuration0,
};

export default function UnixTimestamp() {
    const [value, setValue] = useState(Date.now());

    const date = new Date(value);

    return (
        <Stack align="center">
            <TimestampInput
                value={value}
                onChange={setValue}
            />
            <ResultsTable
                data={[
                    ["Timestamp", value.toString()],
                    ["ISO", date.toISOString()],
                    ["Date#toDateString", date.toDateString()],
                    ["Date#toTimeString", date.toTimeString()],
                ]}
            />
        </Stack>
    );
}
