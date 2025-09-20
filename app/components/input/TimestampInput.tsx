import { Group, NumberInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { ActionButton } from "../ui/ActionButton";
import { IconClockDown } from "@tabler/icons-react";

export const TimestampInput = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (ts: number) => void;
}) => {
    return (
        <Group gap={4} align="end">
            <DateTimePicker
                label="Date/Time"
                value={new Date(value).toISOString()}
                onChange={(v) => onChange(new Date(v || 0).getTime())}
                withSeconds
            />
            <NumberInput
                label="Timestamp"
                value={value}
                onChange={n => onChange(Number(n))}
                maw="17ch"
            />
            <ActionButton
                label="Use Current Time"
                icon={<IconClockDown />}
                onClick={() => onChange(Date.now())}
                size="input-sm"
                variant="light"
            />
        </Group>
    )
};
