import { Stack } from "@mantine/core";
import type { ToolInfo } from "../../tool";
import { StringInput } from "../../components/input/StringInput";
import { ResultsTable } from "../../components/output/ResultsTable";
import { useState } from "react";
import { IconLogicXor } from "@tabler/icons-react";

export const info: ToolInfo = {
	id: "xor-cipher",
	name: "XOR Cipher",
	icon: IconLogicXor,
	tags: ["string"],
};

function xorText(input: string, key: string) {
	let out = ""
	for (let i = 0; i < input.length; i++) {
		out += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
	}
	return out;
}

export default function XORCipher() {
	const [value, setValue] = useState("");
	const [key, setKey] = useState("");

	return (
		<Stack>
			<StringInput
				value={value}
				onChange={setValue}
			/>
			<StringInput
				value={key}
				onChange={setKey}
			/>

			<ResultsTable
				data={[
					["Output", xorText(value, key)],
				]}
			/>
		</Stack>
	)
}
