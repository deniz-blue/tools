import { Code, Group, Stack } from "@mantine/core";
import { useState } from "react";
import { ValueCopyButton } from "./ValueCopyButton";
import { ActionButton } from "./ActionButton";
import { IconReload } from "@tabler/icons-react";

export const RandomFunctionTool = ({
    fn,
}: {
    fn: () => string;
}) => {
    const [value, setValue] = useState("");

    const generate = () => setValue(fn());

    return (
        <Stack>
            <Group justify='space-between' align="center">
                <Code>{value}</Code>
                <Group justify='center'>
                    <ValueCopyButton value={value} />
                    <ActionButton
                        label="Another, please"
                        icon={<IconReload />}
                        onClick={generate}
                    />
                </Group>
            </Group>
        </Stack>
    )
};
