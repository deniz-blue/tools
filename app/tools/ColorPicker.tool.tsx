import { useState } from "react";
import type { ToolInfo } from "../tool";
import { Checkbox, ColorPicker, Stack, parseColor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ResultsTable } from "../components/output/ResultsTable";
import { IconPalette } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "color-picker",
    name: "Color Picker",
    icon: IconPalette,
    tags: [],
};

export default function ColorPickerTool() {
    const [value, setValue] = useState("#000000");
    const [alpha, { toggle }] = useDisclosure(false);
    
    const format = !alpha ? "hex" : "hexa";

    return (
        <Stack align="center">
            <Checkbox
                label="Alpha"
                checked={alpha}
                onChange={toggle}
            />
            <ColorPicker
                value={value}
                onChange={(v) => setValue(v)}
                format={format}
            />
            <ResultsTable
                data={[
                    ["Hex", value],
                    ["Hue (0-360)", parseColor(value).h.toString()],
                    ["Saturation (0-100)", parseColor(value).s.toString()],
                    ["HSValue (0-100)", parseColor(value).v.toString()],
                    ["Alpha (0-1)", parseColor(value).a.toString()],
                ]}
            />
        </Stack>
    );
};
