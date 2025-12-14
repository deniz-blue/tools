import type { ToolInfo } from "../tool";
import { Stack, Table } from "@mantine/core";
import { useState } from "react";
import { StringInput } from "../components/input/StringInput";
import { InlineMath } from "../components/display/InlineMath";

export const info: ToolInfo = {
    id: "measurement-errors",
    name: "Measurement Errors",
    desc: "Physics I",
    tags: [],
};

export default function MeasurementErrors() {
    const [value, setValue] = useState("34,88\n35,01\n34,84\n34,87\n34,88");
    const [tvalue, setTValue] = useState("2.78");

    const digits = 6;
    // @ts-ignore
    const p = (x: number) => x.toFixed(digits) / 1;

    const numbers = value.split("\n").map(x => Number(x.replaceAll(",", "."))).filter(x => !isNaN(x));
    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = sum / numbers.length;
    const differences = numbers.map(x => x - average);
    const differencesSquared = differences.map(x => x * x);
    const S = (numbers.length < 2) ? 0 : Math.sqrt(differencesSquared.reduce((a, b) => a + b, 0) / (numbers.length-1));
    const deltaSMean = S / Math.sqrt(numbers.length);

    const confidence = 0.95;
    // Student t (95%)
    const t95 = {
        1: 12.71,
        2: 4.30,
        3: 3.18,
        4: 2.78,
        5: 2.57,
        6: 2.45,
        7: 2.36,
        8: 2.31,
        9: 2.26,
        10: 2.23
    } as Record<number, number>;

    const t = parseInt(tvalue) ?? t95[numbers.length] ?? 0;
    const deltaD = t * deltaSMean;

    return (
        <Stack>
            <StringInput
                label="Measurements"
                description="Delimeter by newline"
                value={value}
                onChange={setValue}
            />

            <StringInput
                label="Student T-value"
                value={tvalue}
                onChange={setTValue}
            />

            <Table
                withTableBorder
                withColumnBorders
                ff="monospace"
                ta="center"
                styles={{
                    tr: {
                        textAlign: "center",
                        width: "100%",
                    },
                }}
            >
                <Table.Thead>
                    <Table.Tr>
                        {[
                            <InlineMath math="a_i" />,
                            <InlineMath math="\overline{a}" />,
                            <InlineMath math="a_i-\overline{a}" />,
                            <InlineMath math="(a_i-\overline{a})^2" />,
                            <InlineMath math="\Delta S_{\overline{a}}" />,
                            <InlineMath math="\Delta a" />,
                        ].map((v, i) => (
                            <Table.Th key={i}>
                                {v}
                            </Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {numbers.map((x, i) => (
                        <Table.Tr>
                            <Table.Td key={i}>
                                {p(x)}
                            </Table.Td>
                            {i == 0 && (
                                <Table.Td rowSpan={numbers.length}>
                                    {p(average)}
                                </Table.Td>
                            )}
                            <Table.Td>
                                {p(differences[i])}
                            </Table.Td>
                            <Table.Td>
                                {p(differencesSquared[i])}
                            </Table.Td>
                            {i == 0 && (
                                <Table.Td rowSpan={numbers.length}>
                                    {p(deltaSMean)}
                                </Table.Td>
                            )}
                            {i == 0 && (
                                <Table.Td rowSpan={numbers.length}>
                                    {p(deltaD)}
                                </Table.Td>
                            )}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Stack>
    )
}
