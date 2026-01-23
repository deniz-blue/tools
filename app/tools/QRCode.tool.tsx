import { IconQrcode } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import { Collapse, ColorInput, Input, SimpleGrid, Slider, Stack } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { StringInput } from "../components/input/StringInput";
import encodeQR, { Bitmap, type ErrorCorrection, type QrOpts } from "qr";

export const info: ToolInfo = {
    id: "qrcode",
    name: "QR Code Generator",
    icon: IconQrcode,
    desc: "Generate QR codes!",
    tags: ["image"],
	featured: true,
};

const errorCorrectionLevels: [ErrorCorrection, string][] = [
    ["low", "7%"],
    ["medium", "15%"],
    ["quartile", "25%"],
    ["high", "30%"],
];

const bitmapSvgPath = (data: boolean[][]) => {
    let prev = { x: 0, y: 0 };
    let commands = [];
    for (let _y in data) {
        let y = Number(_y);
        for (let _x in data) {
            let x = Number(_x);

            if (!data[x][y]) continue;

            // Determine the shortest way to represent the initial cursor movement.
            // M - Move cursor (without drawing) to absolute coordinate pair.
            let m = `M${x} ${y}`;
            // Only allow using the relative cursor move command if previous points
            // were drawn.
            if (prev) {
                // m - Move cursor (without drawing) to relative coordinate pair.
                const relM = `m${x - prev.x} ${y - prev.y}`;
                if (relM.length <= m.length) m = relM;
            }

            // Determine the shortest way to represent the cell's bottom line draw.
            // H - Draw line from cursor position to absolute x coordinate.
            // h - Draw line from cursor position to relative x coordinate.
            const bH = x < 10 ? `H${x}` : 'h-1';

            // v - Draw line from cursor position to relative y coordinate.
            // Z - Close path (draws line from cursor position to M coordinate).
            commands.push(`${m}h1v1${bH}Z`);
            prev = { x, y };
        }
    }
    return commands.join(" ");
};

export default function QRCodeGenerator() {
    const [value, setValue] = useState("");
    const [ecc, setEcc] = useState<ErrorCorrection>("medium");
    const [border, setBorder] = useState<number>(2);
    const [fill, setFill] = useState("#000000");
    const [background, setBackground] = useState("#ffffff");

    const desiredSize = 500;
    const styleSize = "15rem";

    const uri = useMemo(() => {
        const qrOpts: QrOpts = {
            border,
            ecc,
        };

        const raw = encodeQR(value, "raw", qrOpts);
        const rawSize = raw.length;
        const sourcePath = `<path fill="${fill}" d="${bitmapSvgPath(raw)}" />`;
        const sourceBg = `<rect width="100%" height="100%" fill="${background}" />`;
        const source = `<svg viewBox="0 0 ${rawSize} ${rawSize}" width="${desiredSize}" height="${desiredSize}" xmlns="http://www.w3.org/2000/svg">${sourceBg}${sourcePath}</svg>`;
        const uri = `data:image/svg+xml,${encodeURIComponent(source)}`;
        return uri;
    }, [
        value,
        border,
        ecc,
        background,
        fill,
        desiredSize,
    ]);

    return (
        <Stack>
            <StringInput
                label="Input"
                placeholder="QR Code contents..."
                value={value}
                onChange={setValue}
            />

            <Stack align="center">
                <Collapse in={!!value}>
                    <img
                        style={{ width: styleSize }}
                        src={uri}
                    />
                </Collapse>
            </Stack>

            <SimpleGrid cols={2}>
                <Stack gap="xs" pb="sm">
                    <Input.Label>
                        Error Correction Level
                    </Input.Label>
                    <Slider
                        min={0}
                        max={errorCorrectionLevels.length - 1}
                        restrictToMarks
                        label={(idx) => errorCorrectionLevels[idx][0]}
                        marks={errorCorrectionLevels.map(([, label], i) => (
                            { value: i, label }
                        ))}
                        value={errorCorrectionLevels.map(x => x[0]).indexOf(ecc)}
                        onChange={idx => setEcc(errorCorrectionLevels[idx][0])}
                    />
                </Stack>
                <Stack gap="xs" pb="sm">
                    <Input.Label>
                        Border (Quiet Zone)
                    </Input.Label>
                    <Slider
                        min={0}
                        max={10}
                        value={border}
                        onChange={setBorder}
                    />
                </Stack>
                <ColorInput
                    label="Fill (Foreground Color)"
                    value={fill}
                    format="hex"
                    onChange={setFill}
                />
                <ColorInput
                    label="Background Color"
                    value={background}
                    format="hex"
                    onChange={setBackground}
                />
            </SimpleGrid>
        </Stack>
    )
}
