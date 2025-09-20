import { Textarea } from "@mantine/core";
import { ValueCopyButton } from "../ui/ValueCopyButton";
import type { ReactNode } from "react";

export const StringOutput = ({
    value,
    ...props
}: {
    value: string;
    label?: ReactNode;
}) => {
    return (
        <Textarea
            autosize
            minRows={1}
            value={value}
            readOnly
            rightSection={(
                <ValueCopyButton
                    value={value}
                />
            )}
            {...props}
        />
    );
};
