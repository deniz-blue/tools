import type { ToolInfo } from "../tool";
import { Box, Button, Divider, Group, Loader, Stack, Text, Tooltip } from "@mantine/core";
import { useWebPermission } from "../hooks/web/useWebPermission";
import { useState } from "react";
import { useAsyncFn } from "../hooks/utils/useAsyncFn";
import { IconMapPin, IconWorldPin } from "@tabler/icons-react";
import { PermissionNugget } from "../components/ui/PermissionNugget";
import { ResultsTable } from "../components/output/ResultsTable";

export const info: ToolInfo = {
    id: "geolocation",
    name: "Geolocation Tool",
    icon: IconWorldPin,
    desc: "Show your coordinates",
    tags: ["device"],
};

export default function GeolocationTool() {
    const { state: permissionState } = useWebPermission("geolocation");

    const [position, setPosition] = useState<GeolocationPosition | null>(null);

    const [getCurrentPosition, { error, running }] = useAsyncFn(async () => {
        const pos = await (new Promise<GeolocationPosition>((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        }));
        setPosition(pos);
        return pos;
    });

    const [watching, setWatching] = useState(false);



    return (
        <Stack>
            <Stack gap={0}>
                <Text fw="bold" fz="xs">
                    PERMISSIONS
                </Text>
                <Group>
                    <PermissionNugget
                        icon={<IconMapPin />}
                        label="Geolocation"
                        state={permissionState}
                        enable={getCurrentPosition}
                    />
                </Group>
            </Stack>

            <Group justify="end">
                <Text c="red" ff="monospace">
                    {error && "" + error}
                </Text>

                <Button
                    variant="light"
                    loading={running}
                    onClick={getCurrentPosition}
                >
                    Get Current Position
                </Button>
            </Group>

            <Stack>
                {position && (
                    <ResultsTable
                        data={[
                            ["timestamp", position.timestamp.toString()],
                            ["latitude", position.coords.latitude.toString()],
                            ["longitude", position.coords.longitude.toString()],
                            position.coords.speed !== null ? ["speed", position.coords.speed.toString()] : null,
                            ["accuracy", position.coords.accuracy.toString()],
                            position.coords.altitude !== null ? ["altitude", position.coords.altitude.toString()] : null,
                            position.coords.altitudeAccuracy !== null ? ["altitude", position.coords.altitudeAccuracy.toString()] : null,
                            position.coords.heading !== null ? ["altitude", position.coords.heading.toString()] : null,
                        ]}
                    />
                )}
            </Stack>
        </Stack>
    )
}
