import { IconSvg } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import { Button, Group, NumberInput, SimpleGrid, Stack, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import { SingleFileInput } from "../components/input/SingleFileInput";
import { MIME_TYPES } from "@mantine/dropzone";

export const info: ToolInfo = {
	id: "svg-to-png",
	name: "SVG to PNG",
	icon: IconSvg,
	desc: "Convert SVG images to PNG format.",
	tags: ["image", "converter"],
};

export default function SvgToPng() {
	const [file, setFile] = useState<File | null>(null);
	const [width, setWidth] = useState<number>(256);
	const [height, setHeight] = useState<number>(256);

	const process = useCallback(() => {
		if (!file) return;
		const canvas = new OffscreenCanvas(width, height);
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const img = new Image();
		img.onload = async () => {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0, width, height);
			const blob = await canvas.convertToBlob({ type: "image/png" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.name.replace(/\.svg$/i, ".png");
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		};
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				img.src = reader.result;
			}
		};
		reader.readAsDataURL(file);
	}, [file, width, height]);

	return (
		<Stack>
			<Group>
				<SingleFileInput
					file={file}
					onFile={(f) => setFile(f)}
					accept={[MIME_TYPES.svg]}
				/>
			</Group>

			{file && (
				<Text>Selected file: {file.name}</Text>
			)}

			<SimpleGrid cols={2}>
				<NumberInput
					label="Width"
					value={width}
					onChange={(val) => setWidth(Number(val) ?? 256)}
					min={1}
				/>
				<NumberInput
					label="Height"
					value={height}
					onChange={(val) => setHeight(Number(val) ?? 256)}
					min={1}
				/>
			</SimpleGrid>

			<Button
				disabled={!file}
				onClick={process}
			>
				Convert to PNG
			</Button>
		</Stack>
	)
};
