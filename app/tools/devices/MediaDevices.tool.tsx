import type { ToolInfo } from "../../tool";
import { Box, Button, Divider, Group, Loader, Stack, Text, Tooltip } from "@mantine/core";
import { useWebPermission } from "../../hooks/web/useWebPermission";
import { useState, type ReactNode } from "react";
import { useAsyncFn } from "../../hooks/utils/useAsyncFn";
import { ResultsTable } from "../../components/output/ResultsTable";
import { IconCamera, IconDevices2, IconMicrophone } from "@tabler/icons-react";
import { PermissionNugget } from "../../components/ui/PermissionNugget";

export const info: ToolInfo = {
    id: "media-devices",
    name: "Media Devices List",
    icon: IconDevices2,
    desc: "Camera & Microphones list",
    tags: ["device"],
};

export default function MediaDevicesTool() {
    const { state: permCamera } = useWebPermission("camera");
    const { state: permMic } = useWebPermission("microphone");

    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    const [requestPermissions, { }] = useAsyncFn(async () => {
        return await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
    });

    const [enumerate, { running: enumerating, error }] = useAsyncFn(async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices(devices);
    });

    return (
        <Stack>
            <Stack gap={0}>
                <Text fw="bold" fz="xs">
                    PERMISSIONS
                </Text>
                <Group>
                    <PermissionNugget
                        icon={<IconMicrophone />}
                        label="Microphone"
                        state={permMic}
                        enable={requestPermissions}
                    />
                    <Divider orientation="vertical" />
                    <PermissionNugget
                        icon={<IconCamera />}
                        label="Camera"
                        state={permCamera}
                        enable={requestPermissions}
                    />
                </Group>
            </Stack>

            <Group justify="end">
                <Text c="red" ff="monospace">
                    {error && ""+error}
                </Text>

                <Button
                    variant="light"
                    loading={enumerating}
                    onClick={enumerate}
                >
                    List Media Devices
                </Button>
            </Group>

            <Stack>
                <Text>
                    {devices.length} devices found
                </Text>

                {devices.map((device) => (
                    <ResultsTable
                        key={device.deviceId}
                        data={[
                            ["deviceId", device.deviceId],
                            ["groupId", device.groupId],
                            ["kind", device.kind],
                            ["label", device.label],
                        ]}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
