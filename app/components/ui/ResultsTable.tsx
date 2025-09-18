import { Code, Group, Table, Text } from "@mantine/core";
import { ValueCopyButton } from "./ValueCopyButton";
import type { ReactNode } from "react";

export const ResultsTable = ({
    data,
}: {
    data: ([ReactNode, string] | null)[];
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
                            <Code>
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
