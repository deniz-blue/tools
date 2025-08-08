import { Textarea } from "@mantine/core";
import type { ReactNode } from "react";
import { ValueCopyButton } from "../ui/ValueCopyButton";

export const StringInput = ({
    value,
    onChange,
    ...props
}: {
    value?: string;
    onChange?: (v: string) => void;
    label?: ReactNode;
    description?: ReactNode;
    placeholder?: string;
}) => {
    return (
        <Textarea
            autosize
            minRows={1}
            value={value}
            onChange={e => onChange?.(e.currentTarget.value)}
            rightSection={(
                <ValueCopyButton
                    value={value}
                />
            )}
            {...props}
        />
    )
};
