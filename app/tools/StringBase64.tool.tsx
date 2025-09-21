import { Stack } from "@mantine/core";
import type { ToolInfo } from "../tool";
import { StringInput } from "../components/input/StringInput";
import { ResultsTable } from "../components/output/ResultsTable";
import { useState } from "react";
import { IconFileText } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "string-base64",
    name: "String to/from Base64",
    icon: IconFileText,
};

export default function StringBase64() {
    const [value, setValue] = useState("");

    let text = "";
    try {
        text = atob(value)
    } catch(e) {};

    return (
        <Stack>
            <StringInput
                value={value}
                onChange={setValue}
            />

            <ResultsTable
                data={[
                    ["Text to Base64", btoa(value)],
                    ["Base64 to Text", text],
                ]}
            />
        </Stack>
    )
}
