import { IconTimezone } from "@tabler/icons-react";
import type { ToolInfo } from "../../tool";
import { Fieldset, SimpleGrid, Stack } from "@mantine/core";
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

            <Fieldset legend="Convert to UTC relative" bg="dark">
                <TimezoneUTCRelative />
            </Fieldset>
        </Stack>
    )
}
