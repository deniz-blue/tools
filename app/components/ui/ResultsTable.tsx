import { Code, Group, Table, Text } from "@mantine/core";
import { ValueCopyButton } from "./ValueCopyButton";

export const ResultsTable = ({
    data,
}: {
    data: ([string, string] | null)[];
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
                        <Code>
                            {value}
                        </Code>
                        <ValueCopyButton value={value} />
                    </Group>
                ]),
            }}
        />
    )
};
