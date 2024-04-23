import { Tooltip, ActionIcon, MantineColor } from '@mantine/core';
import React from 'react';

export const ActionButtonWithTooltip = ({
    label, color, icon, onClick,
}: {
    label: React.ReactNode;
    color?: MantineColor;
    icon: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <Tooltip label={label}>
            <ActionIcon
                onClick={onClick}
                color={color || "gray"}
                variant="subtle"
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    );
};
