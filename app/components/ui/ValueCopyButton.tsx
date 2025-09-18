import { CopyButton } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { ActionButton } from "./ActionButton";

export const ValueCopyButton = ({
    value,
    disabled,
}: {
    value?: string;
    disabled?: boolean;
}) => {
    return (
        <CopyButton value={value || ""}>
            {({ copied, copy }) => (
                <ActionButton
                    label={copied ? "Copied!" : "Copy"}
                    icon={<IconCopy />}
                    onClick={copy}
                    color={copied ? "green" : undefined}
                    disabled={disabled}
                />
            )}
        </CopyButton>
    );
};
