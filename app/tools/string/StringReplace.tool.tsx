import { Box, Button, Fieldset, Group, Input, SimpleGrid, Stack, Text } from "@mantine/core";
import type { ToolInfo } from "../../tool";
import { StringInput } from "../../components/input/StringInput";
import { useState } from "react";
import { StringOutput } from "../../components/output/StringOutput";
import { useListState } from "@mantine/hooks";
import { IconLetterCase, IconX } from "@tabler/icons-react";
import { ActionButton } from "../../components/ui/ActionButton";

export const info: ToolInfo = {
    id: "string-replace",
    name: "String Replace Tool",
    icon: IconLetterCase,
    desc: "String substitution tool",
    tags: ["string"],
};

interface Rule {
    from: string;
    to: string;
};

export default function StringReplaceTool() {
    const [value, setValue] = useState("");
    const [rules, handlers] = useListState<Rule>([]);

    let output = value;
    for (let rule of rules) {
        output = output.replaceAll(rule.from, rule.to);
    }

    return (
        <Stack>
            <StringInput
                label="Input"
                value={value}
                onChange={setValue}
            />

            <Fieldset
                legend="Replacements"
                bg="dark"
            >
                <Stack gap="xs">
                    {!!rules.length && (
                        <Group gap={4}>
                            <Group gap={4} grow flex="1">
                                {["Replace from", "Replace to"].map(t => (
                                    <Input.Label
                                        key={t}
                                    >
                                        {t}
                                    </Input.Label>
                                ))}
                            </Group>
                            <Box
                                w={24+4}
                            />
                        </Group>
                    )}
                    {rules.map((rule, i) => (
                        <Group
                            key={i}
                            align="end"
                            gap={4}
                        >
                            <Group grow flex="1" gap={4}>
                                <StringInput
                                    value={rule.from}
                                    onChange={v => handlers.setItemProp(i, "from", v)}
                                />
                                <StringInput
                                    value={rule.to}
                                    onChange={v => handlers.setItemProp(i, "to", v)}
                                />
                            </Group>
                            <ActionButton
                                label="Remove"
                                icon={<IconX />}
                                onClick={() => handlers.remove(i)}
                            />
                        </Group>
                    ))}

                    <Group w="100%" justify="end">
                        <Button
                            variant="light"
                            color="gray"
                            onClick={() => handlers.append({
                                from: "",
                                to: "",
                            })}
                        >
                            Add
                        </Button>
                    </Group>
                </Stack>
            </Fieldset>

            {/* <SimpleGrid cols={2}>
                <StringInput
                    label="Replace from"
                    value={from}
                    onChange={setFrom}
                />
                <StringInput
                    label="Replace to"
                    value={to}
                    onChange={setTo}
                />
            </SimpleGrid> */}

            <StringOutput
                label="Output"
                value={output}
            />
        </Stack>
    )
}
