import { Tooltip, ActionIcon, type MantineColor, type ActionIconProps } from '@mantine/core';
import React from 'react';

export const ActionButton = ({
    label, color, icon, onClick, disabled, size, variant,
}: {
    label: React.ReactNode;
    color?: MantineColor;
    icon: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    size?: ActionIconProps["size"];
    variant?: ActionIconProps["variant"];
}) => {
    return (
        <Tooltip label={label}>
            <ActionIcon
                onClick={onClick}
                color={color || "gray"}
                variant={variant || "subtle"}
                disabled={disabled}
                size={size}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    );
};
