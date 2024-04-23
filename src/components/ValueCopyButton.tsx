import { CopyButton } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import React from 'react';
import { ActionButtonWithTooltip } from "./ActionButtonWithTooltip";

export const ValueCopyButton = ({ value }: { value: string; }) => {
    return (
        <CopyButton value={value}>
            {({ copied, copy }) => (
                <ActionButtonWithTooltip
                    label={copied ? "Copied!" : "Copy"}
                    icon={<IconCopy />}
                    onClick={copy}
                    color={copied ? "green" : undefined} />
            )}
        </CopyButton>
    );
};
