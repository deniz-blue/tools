import { IconTemperature } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import { Stack } from "@mantine/core";

export const info: ToolInfo = {
    id: "temperature",
    name: "Temperature Converter",
    icon: IconTemperature,
    hidden: true,
};

export default function TemperatureConverter() {
    return (
        <Stack>

        </Stack>
    )
}
