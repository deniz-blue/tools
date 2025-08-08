import { Button, FileButton, Stack } from "@mantine/core";
import { useState } from "react";

export default function VideoToGif() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <Stack>
            <FileButton onChange={setFile} accept="video/*">
                {(props) => (
                    <Button {...props}>
                        Select Video File
                    </Button>
                )}
            </FileButton>


        </Stack>
    )
}
