import { Checkbox, Code, ColorPicker, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { ValueCopyButton } from "../../app/components/ui/ValueCopyButton";

export const ColorPickerTool = () => {
    const [value, setValue] = useState("#000000");
    const [alpha, setAlpha] = useState(false);
    
    const format = "rgb" + (alpha ? "a" : "");

    return (
        <Stack>
            <Checkbox
                label="Alpha"
            />
            <ColorPicker
                value={value}
                onChange={(v) => setValue(v)}
                fullWidth
            />
            <Group justify='space-between'>
                <Text>Hex:</Text>
                <Group>
                    <Code>{value}</Code>
                    <ValueCopyButton value={value} />
                </Group>
            </Group>
        </Stack>
    );
};
