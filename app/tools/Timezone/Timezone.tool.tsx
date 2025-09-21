import { IconTimezone } from "@tabler/icons-react";
import type { ToolInfo } from "../../tool";
import { Code, Fieldset, SimpleGrid, Stack, Text } from "@mantine/core";
import { ResultsTable } from "../../components/output/ResultsTable";
import { fmtOffset } from "./fmt";
import { TimezoneUTCRelative } from "./TimezoneUTCRelative";

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
            <ResultsTable
                data={[["Your Timezone is:", localTzName]]}
                valueProps={{ fz: "lg" }}
            />

            <Fieldset legend="UTC-relative & Current time" bg="dark">
                <TimezoneUTCRelative />
            </Fieldset>

            <Stack gap={0}>
                <Text ta="center" c="dimmed" fz="sm">
                    You can also input UTC/GMT-relative timezones, such as 'GMT+10' or 'UTC-2'.
                </Text>

                <Text ta="center" c="dimmed" fz="sm">
                    IANA <Code>Etc/*</Code> timezones are not included because they are confusing
                </Text>
            </Stack>
        </Stack>
    )
}
