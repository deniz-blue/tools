import { Button, Code, Group, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import type { ToolInfo } from "../tool";
import { IconTimeDuration0 } from "@tabler/icons-react";
import { ResultsTable } from "../components/ui/ResultsTable";

export const info: ToolInfo = {
    id: "unix-timestamp",
    name: "Unix Timestamp",
    icon: IconTimeDuration0,
};

export default function UnixTimestamp() {
    const [value, setValue] = useState(new Date());

    const output = value.getTime().toString();

    return (
        <Stack align="center">
            <DateTimePicker
                label="Date/Time"
                value={value}
                onChange={(v) => v && setValue(new Date(v))}
                withSeconds
            />
            <Button
                variant="light"
                onClick={() => setValue(new Date())}
            >
                Use Current Time
            </Button>
            <ResultsTable
                data={[
                    ["Timestamp", output],
                ]}
            />
        </Stack>
    );
}
