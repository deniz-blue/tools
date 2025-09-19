import { useState } from "react";
import type { ToolInfo } from "../tool";
import { Stack, Text } from "@mantine/core";
import { StringInput } from "../components/input/StringInput";
import { ResultsTable } from "../components/ui/ResultsTable";
import { IconFileText } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "string-decimal",
    name: "String to/from Decimal",
    icon: IconFileText,
};

export default function StringDecimal() {
    const [value, setValue] = useState("");

    const asDecimal = value.split("").map(s => s.charCodeAt(0));
    const asString = value.split(/[ ,]/g)
        .filter(x => !!x)
        .map(n => Number(n))
        .filter(x => !isNaN(x))
        .map(n => String.fromCharCode(n))
        .join("");

    return (
        <Stack>
            <StringInput
                value={value}
                onChange={setValue}
            />

            <ResultsTable
                data={[
                    ["Decimal to Text", asString],
                    ["Text as Decimal (spaces)", asDecimal.join(" ")],
                    ["Text as Decimal (commas)", asDecimal.join(",")],
                ]}
            />

            <Text>
                When converting from decimal to text, you can use spaces or commas as a delimeter.
            </Text>
        </Stack>
    )
}
