import { Textarea, type TextareaProps } from "@mantine/core";
import { ValueCopyButton } from "../ui/ValueCopyButton";

export interface StringInputProps {
    value?: string;
    onChange?: (v: string) => void;
};

export const StringInput = ({
    value,
    onChange,
    ...props
}: StringInputProps & Omit<TextareaProps, keyof StringInputProps>) => {
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
            styles={{
                input: {
                    padding: 4,
                },
            }}
            {...props}
        />
    )
};
