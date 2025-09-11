import { Button, Group, Loader, Tooltip } from "@mantine/core";
import { IconCheck, IconCircleOff, IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";

export const PermissionNugget = ({
    icon,
    label,
    state,
    enable,
}: {
    icon?: ReactNode;
    label?: ReactNode;
    state: PermissionState | "unsupported" | "checking";
    enable?: () => any;
}) => {
    return (
        <Group gap={4}>
            <Tooltip label={label} disabled={!label}>
                {icon}
            </Tooltip>
            {state == "checking" && <Loader size="xs" />}
            {state == "prompt" && (
                <Group>
                    <Button
                        variant="light"
                        size="compact-sm"
                        onClick={enable}
                    >
                        Enable
                    </Button>
                </Group>
            )}
            {state == "unsupported" && (
                <Tooltip label="Unsupported">
                    <Group c="red">
                        <IconCircleOff />
                    </Group>
                </Tooltip>
            )}
            {state == "denied" && <IconX />}
            {state == "granted" && (
                <Group c="green">
                    <IconCheck />
                </Group>
            )}
        </Group>
    )
};