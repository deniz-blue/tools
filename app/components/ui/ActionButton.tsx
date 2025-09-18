import { Tooltip, ActionIcon, type MantineColor } from '@mantine/core';
import React from 'react';

export const ActionButton = ({
    label, color, icon, onClick, disabled,
}: {
    label: React.ReactNode;
    color?: MantineColor;
    icon: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean,
}) => {
    return (
        <Tooltip label={label}>
            <ActionIcon
                onClick={onClick}
                color={color || "gray"}
                variant="subtle"
                disabled={disabled}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    );
};
