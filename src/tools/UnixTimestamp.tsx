import { Code, Group, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { ValueCopyButton } from "../../app/components/ui/ValueCopyButton";
import { useState } from "react";

export const UnixTimestamp = () => {
    const [value, setValue] = useState(new Date());

    const output = value.getTime().toString();

    return (
        <Stack>
            <DateTimePicker
                label="Date/Time"
                value={value}
                onChange={(v) => v && setValue(v)}
            />
            <Group justify='center'>
                <Code>{output}</Code>
                <ValueCopyButton value={output} />
            </Group>
        </Stack>
    );
}
