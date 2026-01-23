import type { ToolInfo } from "../tool";
import { ScrollArea, Stack, Table } from "@mantine/core";
import { useMemo, useState } from "react";
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

    type Rational = { num: bigint; den: bigint };

    const pow10 = (n: number) => {
        let result = 1n;
        for (let i = 0; i < n; i++) result *= 10n;
        return result;
    };

    const bigintGcd = (a: bigint, b: bigint): bigint => {
        let x = a < 0n ? -a : a;
        let y = b < 0n ? -b : b;
        while (y !== 0n) {
            const temp = x % y;
            x = y;
            y = temp;
        }
        return x;
    };

    const normalize = ({ num, den }: Rational): Rational => {
        if (den === 0n) return { num: 0n, den: 1n };
        const g = bigintGcd(num, den);
        const sign = den < 0n ? -1n : 1n;
        return { num: (num / g) * sign, den: (den / g) * sign };
    };

    const add = (a: Rational, b: Rational): Rational => normalize({
        num: a.num * b.den + b.num * a.den,
        den: a.den * b.den,
    });

    const sub = (a: Rational, b: Rational): Rational => normalize({
        num: a.num * b.den - b.num * a.den,
        den: a.den * b.den,
    });

    const mul = (a: Rational, b: Rational): Rational => normalize({
        num: a.num * b.num,
        den: a.den * b.den,
    });

    const div = (a: Rational, b: Rational): Rational => normalize({
        num: a.num * b.den,
        den: a.den * b.num,
    });

    const bigintSqrt = (value: bigint): bigint => {
        if (value < 0n) return 0n;
        if (value < 2n) return value;
        let x0 = value;
        let x1 = (value >> 1n) + 1n;
        while (x1 < x0) {
            x0 = x1;
            x1 = (value / x1 + x1) >> 1n;
        }
        return x0;
    };

    const sqrtRational = (r: Rational, decimalPlaces: number): Rational => {
        if (r.num <= 0n) return { num: 0n, den: 1n };
        const scale = pow10(decimalPlaces);
        const scaledRadicand = (r.num * scale * scale) / r.den;
        return normalize({ num: bigintSqrt(scaledRadicand), den: scale });
    };

    const formatRational = (r: Rational, decimalPlaces: number): string => {
        const { num, den } = normalize(r);
        if (den === 0n) return "NaN";
        const negative = num < 0n;
        let n = negative ? -num : num;
        let integerPart = n / den;
        const remainder = n % den;
        if (decimalPlaces === 0) return `${negative ? "-" : ""}${integerPart.toString()}`;

        const scale = pow10(decimalPlaces);
        const scaled = (remainder * scale * 10n) / den; // extra digit for rounding
        let rounded = (scaled + 5n) / 10n;

        if (rounded >= scale) {
            integerPart += 1n;
            rounded -= scale;
        }

        const frac = rounded.toString().padStart(decimalPlaces, "0");
        return `${negative ? "-" : ""}${integerPart.toString()}.${frac}`;
    };

    type ParsedDecimal = {
        sign: 1 | -1;
        intPart: string;
        fracPart: string;
        decimals: number;
    };

    const parseDecimal = (text: string): ParsedDecimal | null => {
        const cleaned = text.trim().replaceAll(",", ".");
        if (!cleaned) return null;
        const match = /^([+-]?)(\d*)(?:\.(\d+))?$/.exec(cleaned);
        if (!match) return null;
        const [, signStr, intPartRaw, fracPartRaw] = match;
        const intPart = intPartRaw || "0";
        const fracPart = fracPartRaw || "";
        return {
            sign: signStr === "-" ? -1 : 1,
            intPart,
            fracPart,
            decimals: fracPart.length,
        };
    };

    const toScaledInt = (parsed: ParsedDecimal, scalePower: number): bigint => {
        const padding = Math.max(0, scalePower - parsed.decimals);
        const combined = `${parsed.intPart}${parsed.fracPart}${"0".repeat(padding)}`;
        const magnitude = combined === "" ? 0n : BigInt(combined);
        return parsed.sign === -1 ? -magnitude : magnitude;
    };

    const parseRational = (text: string): Rational | null => {
        const parsed = parseDecimal(text);
        if (!parsed) return null;
        const den = pow10(parsed.decimals);
        const magnitude = parsed.intPart + parsed.fracPart;
        const num = magnitude === "" ? 0n : BigInt(magnitude) * BigInt(parsed.sign);
        return normalize({ num, den });
    };

    const measurements = useMemo(() => {
        const parsed = value
            .split("\n")
            .map(line => parseDecimal(line))
            .filter((v): v is ParsedDecimal => Boolean(v));
        if (parsed.length === 0) return { values: [] as bigint[], scalePower: 0 };
        const scalePower = parsed.reduce((max, v) => Math.max(max, v.decimals), 0);
        const values = parsed.map(v => toScaledInt(v, scalePower));
        return { values, scalePower };
    }, [value]);

    const scale = pow10(measurements.scalePower);
    const count = measurements.values.length;
    const sum = measurements.values.reduce((acc, v) => acc + v, 0n);
    const average: Rational = count === 0 ? { num: 0n, den: 1n } : normalize({ num: sum, den: scale * BigInt(count) });

    const diffs: Rational[] = measurements.values.map(v => normalize({
        num: v * BigInt(count) - sum,
        den: scale * BigInt(count),
    }));

    const diffsSquared: Rational[] = diffs.map(d => ({
        num: d.num * d.num,
        den: d.den * d.den,
    }));

    const sumSquaresNum = diffsSquared.reduce((acc, d) => acc + d.num, 0n);
    const sumSquaresDen = diffsSquared.length === 0 ? 1n : diffsSquared[0].den;

    const variance: Rational = count < 2 ? { num: 0n, den: 1n } : normalize({
        num: sumSquaresNum,
        den: sumSquaresDen * BigInt(count - 1),
    });

    const varianceOverN: Rational = count === 0 ? { num: 0n, den: 1n } : div(variance, { num: BigInt(count), den: 1n });

    const S = count < 2 ? { num: 0n, den: 1n } : sqrtRational(variance, digits);
    const deltaSMean = count === 0 ? { num: 0n, den: 1n } : sqrtRational(varianceOverN, digits);

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
        10: 2.23,
    } as Record<number, number>;

    const tParsed = parseRational(tvalue) ?? (t95[count] ? parseRational(String(t95[count])) : null);
    const t = tParsed ?? { num: 0n, den: 1n };
    const deltaD = mul(t, deltaSMean);

    const toDisplay = (r: Rational) => formatRational(r, digits);
    const toValueDisplay = (scaled: bigint) => formatRational({ num: scaled, den: scale }, digits);

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

            <ScrollArea.Autosize maw="100%" scrollbars="x">
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
                        <Table.Tr style={{ textWrap: "nowrap" }}>
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
                        {measurements.values.map((x, i) => (
                            <Table.Tr key={i}>
                                <Table.Td>
                                    {toValueDisplay(x)}
                                </Table.Td>
                                {i === 0 && (
                                    <Table.Td rowSpan={measurements.values.length}>
                                        {toDisplay(average)}
                                    </Table.Td>
                                )}
                                <Table.Td>
                                    {toDisplay(diffs[i])}
                                </Table.Td>
                                <Table.Td>
                                    {toDisplay(diffsSquared[i])}
                                </Table.Td>
                                {i === 0 && (
                                    <Table.Td rowSpan={measurements.values.length}>
                                        {toDisplay(deltaSMean)}
                                    </Table.Td>
                                )}
                                {i === 0 && (
                                    <Table.Td rowSpan={measurements.values.length}>
                                        {toDisplay(deltaD)}
                                    </Table.Td>
                                )}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
        </Stack>
    )
}
