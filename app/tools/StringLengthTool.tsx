import { Code, Group, Stack, Text } from "@mantine/core";
import { useState } from "react"
import { StringInput } from "../components/input/StringInput";
import { ResultsTable } from "../components/ui/ResultsTable";
import type { ToolInfo } from "../tool";
import { IconLetterCase } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "string-length",
    name: "String Length Tool",
    icon: IconLetterCase,
};

export default function StringLengthTool() {
    const [value, setValue] = useState("");

    const length = value.length.toString();
    const byteLength = new TextEncoder().encode(value).byteLength.toString();

    return (
        <Stack>
            <StringInput
                value={value}
                onChange={setValue}
            />

            <ResultsTable
                data={[
                    ["Length", length],
                    byteLength === length ? null : ["Byte Length", byteLength],
                    ["Whitespace", value.replace(/\w/g, "").length.toString()],
                    ["Non-Whitespace", value.replace(/\W/g, "").length.toString()],
                ]}
            />
        </Stack>
    )
}
