import { Code, Group } from "@mantine/core";
import { ValueCopyButton } from "../../app/components/ui/ValueCopyButton";
import { ActionButton } from "../../app/components/ui/ActionButton";
import { IconReload } from "@tabler/icons-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const RandomUUID = () => {
    const [UUID, setUUID] = useState(uuidv4());

    return (
        <Group justify='space-between' align="center">
            <Code>{UUID}</Code>
            <Group justify='center'>
                <ValueCopyButton value={UUID} />
                <ActionButton
                    label="Another, please"
                    icon={<IconReload />}
                    onClick={() => setUUID(uuidv4())}
                />
            </Group>
        </Group>
    );
};
