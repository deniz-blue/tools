import { Stack } from "@mantine/core";
import type { ToolInfo } from "../tool";
import { StringInput } from "../components/input/StringInput";
import { ResultsTable } from "../components/ui/ResultsTable";
import { useState } from "react";
import { IconFileText } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "string-hex",
    name: "String to/from Hex",
    icon: IconFileText,
};

const hexDecode = (s: string) => {
    let hex = s
        .toLowerCase()
        .split("")
        .filter(x => /[0-9a-f]/.test(x))
        .join("");

    let str = '';
    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
    return str;
};

const hexEncode = (s: string) => {
    let arr: string[] = [];
    for (let i = 0, l = s.length; i < l; i++) {
        let hex = Number(s.charCodeAt(i)).toString(16).padStart(2, "0");
        arr.push(hex);
    }
    return arr.join('');
};

export default function StringHex() {
    const [value, setValue] = useState("");

    const asText = hexDecode(value);
    const asHex = hexEncode(value);

    return (
        <Stack>
            <StringInput
                value={value}
                onChange={setValue}
            />

            <ResultsTable
                data={[
                    ["Hex to Text", asText],
                    ["Text to Hex", asHex],
                ]}
            />
        </Stack>
    )
}
