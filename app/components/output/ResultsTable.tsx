import { Code, Group, Table, Text, type CodeProps } from "@mantine/core";
import { ValueCopyButton } from "../ui/ValueCopyButton";
import type { ReactNode } from "react";

export type Result = [ReactNode, string] | [ReactNode, string, {
    valueProps?: CodeProps;
}];

export const ResultsTable = ({
    data,
}: {
    data: (Result | null)[];
}) => {
    return (
        <Table
            w="100%"
            data={{
                body: data.filter(x => x !== null).map(([key, value, extra = {}]) => [
                    <Text span>
                        {key}
                    </Text>,
                    <Group w="100%" justify="end">
                        {value ? (
                            <Code {...(extra.valueProps || {})}>
                                {value}
                            </Code>
                        ) : (
                            <Text fz="sm" c="dimmed" inline span>
                                {"<empty>"}
                            </Text>
                        )}
                        <ValueCopyButton value={value} disabled={!value} />
                    </Group>
                ]),
            }}
        />
    )
};
