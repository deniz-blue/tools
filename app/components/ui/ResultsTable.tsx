import { Code, Group, Table, Text, type CodeProps } from "@mantine/core";
import { ValueCopyButton } from "./ValueCopyButton";
import type { ReactNode } from "react";

export const ResultsTable = ({
    data,
    valueProps,
}: {
    data: ([ReactNode, string] | null)[];
    valueProps?: CodeProps;
}) => {
    return (
        <Table
            w="100%"
            data={{
                body: data.filter(x => x !== null).map(([key, value]) => [
                    <Text>
                        {key}
                    </Text>,
                    <Group w="100%" justify="end">
                        {value ? (
                            <Code {...valueProps}>
                                {value}
                            </Code>
                        ) : (
                            <Text fz="sm" c="dimmed" inline>
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
