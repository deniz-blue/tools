import { IconTimezone } from "@tabler/icons-react";
import type { ToolInfo } from "../../tool";
import { Code, Fieldset, SimpleGrid, Stack, Text } from "@mantine/core";
import { ResultsTable } from "../../components/output/ResultsTable";
import { fmtOffset } from "./fmt";
import { TimezoneInfo } from "./TimezoneInfo";

export const info: ToolInfo = {
    id: "timezone",
    name: "Timezone Tool",
    icon: IconTimezone,
};

export default function TimezoneTool() {
    const localTzOffset = -new Date().getTimezoneOffset();
    const localTzName = fmtOffset(localTzOffset);

    return (
        <Stack>
            <Stack>
                <ResultsTable
                    data={[
                        ["Your Timezone is:", localTzName, { valueProps: { fz: "lg" } }],
                        [
                            "Discord Bio:",
                            `My midnight is your <t:${Math.floor(new Date("2000-01-01T00:00").getTime() / 1000)}:t>`
                        ],
                    ]}
                />
            </Stack>

            <Fieldset legend="Timezone Information" bg="dark">
                <TimezoneInfo />
            </Fieldset>

            <Stack gap={0}>
                <Text ta="center" c="dimmed" fz="sm">
                    You can also input UTC/GMT-relative timezones, such as 'GMT+10' or 'UTC-2'.
                </Text>

                <Text ta="center" c="dimmed" fz="sm">
                    Timezones are case-insensitive
                </Text>

                <Text ta="center" c="dimmed" fz="sm">
                    IANA <Code>Etc/*</Code> timezones are not included in autocomplete
                </Text>
            </Stack>
        </Stack>
    )
}
