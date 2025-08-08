import { CopyButton } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { ActionButton } from "./ActionButton";

export const ValueCopyButton = ({ value }: { value?: string; }) => {
    return (
        <CopyButton value={value || ""}>
            {({ copied, copy }) => (
                <ActionButton
                    label={copied ? "Copied!" : "Copy"}
                    icon={<IconCopy />}
                    onClick={copy}
                    color={copied ? "green" : undefined}
                />
            )}
        </CopyButton>
    );
};
