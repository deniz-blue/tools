import { ActionIcon, Button, Center, CloseButton, Group, Text } from "@mantine/core";
import { Dropzone, type DropzoneProps } from "@mantine/dropzone";
import { useWindowEvent } from "@mantine/hooks";
import { useRef } from "react";

export const SingleFileInput = ({
	file,
	onFile,
	accept,
}: {
	file?: File | null;
	onFile?: (file: File | null) => void;
	accept?: DropzoneProps["accept"];
}) => {
	const openRef = useRef<() => void>(null);

	useWindowEvent("paste", (event) => {
		const clipboardData = event.clipboardData;
		if (!clipboardData) return;
		const files = clipboardData.files;
		if (files.length === 0) return;
		onFile?.(files[0]);
	});

	return (
		<>
			<Group justify="center" mt="md">
				<Button variant="light" onClick={() => openRef.current?.()}>
					Select files
				</Button>
				{file && (
					<CloseButton onClick={() => onFile?.(null)} />
				)}
			</Group>

			<Dropzone.FullScreen
				openRef={openRef}
				onReject={(files) => console.log('rejected files', files)}
				onDrop={(files) => {
					onFile?.(files[0]);
				}}
				accept={accept}
			>
				<Center>
					<Dropzone.Accept>
						<Text>Drop files here</Text>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<Text>File not accepted</Text>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<Text>Drag files here or click to select files</Text>
					</Dropzone.Idle>
				</Center>
			</Dropzone.FullScreen>
		</>
	);
};
