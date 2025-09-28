import { Button, Code, Group, Stack, Text } from "@mantine/core";
import type { ToolInfo } from "../../tool";
import { IconKeyboard } from "@tabler/icons-react";
import { useSet, useWindowEvent } from "@mantine/hooks";

export const info: ToolInfo = {
    id: "keyboard",
    name: "Keyboard Tool",
    icon: IconKeyboard,
    desc: "Show key presses",
    tags: ["device"],
};

export default function KeyboardTool() {
    const pressedKeys = useSet<string>([]);

    const keyFromEvent = (e: KeyboardEvent) => {
        return e.key + ({
            [e.DOM_KEY_LOCATION_STANDARD]: "",
            [e.DOM_KEY_LOCATION_RIGHT]: " (RIGHT)",
            [e.DOM_KEY_LOCATION_LEFT]: " (LEFT)",
            [e.DOM_KEY_LOCATION_NUMPAD]: " (NUMPAD)",
        }[e.location || 0] || "");
    };

    useWindowEvent("keydown", (e) => pressedKeys.add(keyFromEvent(e)));
    useWindowEvent("keyup", (e) => pressedKeys.delete(keyFromEvent(e)));

    return (
        <Stack align="centers">
            <Stack align="center">
                <Text fw="bold">
                    Pressed keys:
                </Text>

                <Group gap="xs">
                    {[...pressedKeys].map(key => (
                        <Code
                            key={key}
                        >
                            {key.trim() || "Space"}
                        </Code>
                    ))}
                </Group>

                <Button
                    variant="light"
                    color="gray"
                    size="compact-sm"
                    onClick={() => pressedKeys.clear()}
                    disabled={!pressedKeys.size}
                >
                    Clear
                </Button>
            </Stack>
        </Stack>
    )
}
