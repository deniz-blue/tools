import { Group, Stack, Title, Text, Button, Space, Tooltip, ActionIcon, Fieldset, SimpleGrid, Code, TextInput, Accordion, Select, Box, Divider } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react';
import React, { useState } from 'react';
import { DateTimePicker } from "@mantine/dates";
import { IconExternalLink } from '@tabler/icons-react';
import { IconBulb } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { ActionButton } from "../app/components/ui/ActionButton";
import { ValueCopyButton } from "../app/components/ui/ValueCopyButton";
import { RandomUUID } from "./tools/RandomUUID";
import { DiscordTimestampGenerator } from "./tools/DiscordTimestamp";
import { Modifiers } from "./tools/Modifiers";
import { MantineBreakpointTester } from "./tools/MantineBreakpoint";
import { UnixTimestamp } from "./tools/UnixTimestamp";
import { ColorPickerTool } from "./tools/ColorPickerTool";

interface Tool {
    name: string;
    render: React.FC<any>;
}

interface Category {
    name: string;
    icon?: React.ReactNode;
    el?: React.FC<any>;
    tools: Tool[];
};

const Categories: Category[] = [
    /* {
        name: "String Modifier",
        tools: [],
        el: Modifiers,
    }, */
    {
        name: "RNG-like",
        tools: [
            {
                name: "Random UUID (v4)",
                render: RandomUUID,
            },
        ],
    },
    {
        name: "Date & Time",
        tools: [
            {
                name: "Discord Timestamp Generator",
                render: DiscordTimestampGenerator,
            },
            {
                name: "Unix Timestamp",
                render: UnixTimestamp,
            },
        ],
    },
    {
        name: "Web Dev Utilities",
        tools: [
            {
                name: "Color Picker",
                render: ColorPickerTool,
            },
            {
                name: "Mantine Breakpoint Tester",
                render: MantineBreakpointTester,
            },
        ],
    },
];

const App = () => {
    const [search, setSearch] = useState("");

    const filteredTools = Categories.map(
        (category) => ({
            ...category,
            tools: category.tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())),
        })
    ).filter(c => c.el || c.tools.length);

    return (
        <Stack align="center" p="md">
            <Space h="md" />
            <Title>deniz's toolbox</Title>

            <Group>
                {[
                    {
                        label: "View My Other Projects",
                        ico: <IconExternalLink />,
                        link: "https://thealan404.github.io/",
                    },
                    {
                        label: "Tool idea? Open an issue!",
                        ico: <IconBulb />,
                        color: "green",
                        link: "https://github.com/TheAlan404/tools/issues",
                    },
                    {
                        label: "View Github Repository",
                        ico: <IconBrandGithub />,
                        color: "dark",
                        link: "https://github.com/TheAlan404/tools/",
                    },
                ].map((l, i) => (<Tooltip label={l.label}>
                    <ActionIcon component="a" variant="subtle" href={l.link} color={l.color}>
                        {l.ico}
                    </ActionIcon>
                </Tooltip>))}
            </Group>

            <Text>
                here are some convenient tools i guess
            </Text>

            <TextInput
                label="Search"
                placeholder='Filter for tools by name'
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                w={{ base: "80%", md: "50%", xl: "40%" }}
            />

            <Stack gap={"lg"} w={{ base: "100%", md: "80%", xl: "60%" }}>
                {filteredTools.map((category, i) => (
                    <Stack>
                        <Divider
                            label={(
                                <Group>
                                    {category.icon} {category.name}
                                </Group>
                            )}
                        />
                        {category.el ? (((El) => <El />)(category.el)) : <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
                            {category.tools.map(({ name, render: Component }, ii) => (
                                <Fieldset legend={name}>
                                    <Component />
                                </Fieldset>
                            ))}
                        </SimpleGrid>}
                    </Stack>
                ))}
            </Stack>

            <Space h="30vh" />
        </Stack>
    )
}

export default App;
