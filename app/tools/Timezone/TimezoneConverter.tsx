import { SimpleGrid, Stack } from "@mantine/core";
import { TimezoneSelect } from "./TimezoneSelect";
import { useState } from "react";

export const TimezoneConverter = () => {
    const [fromTz, setFromTz] = useState<string | null>(null);
    const [fromValue, setFromValue] = useState<string | null>(null);
    const [toTz, setToTz] = useState<string | null>(null);

    return (
        <SimpleGrid cols={2}>
            <Stack>
                <TimezoneSelect
                    value={fromTz}
                    onChange={setFromTz}
                />
            </Stack>
            <Stack>
                <TimezoneSelect
                    value={toTz}
                    onChange={setToTz}
                />
            </Stack>
        </SimpleGrid>
    )
};
