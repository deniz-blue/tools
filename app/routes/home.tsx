import { Anchor, Container, Divider, Group, Paper, SimpleGrid, Space, Stack, Text, Title } from "@mantine/core";
import { TOOLS_LIST } from "../tools";
import { Link } from "react-router";
import { IconDevices2, IconExternalLink, IconFileText, IconLetterCase, IconTool } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import "./home.css";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
    { title: "Deniz's Tools" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Deniz's Tools" },
];

interface SectionConfig {
    name: string;
    icon?: React.ReactNode;
    filter: (tool: ToolInfo) => boolean;
}

const sections: SectionConfig[] = [
    {
        name: "String Converters",
        icon: <IconFileText />,
        filter: (tool) => !!tool.tags && tool.tags.includes("string") && tool.tags.includes("converter"),
    },
    {
        name: "String Tools",
        icon: <IconLetterCase />,
        filter: (tool) => !!tool.tags && tool.tags.includes("string") && !tool.tags.includes("converter"),
    },
    {
        name: "Devices",
        icon: <IconDevices2 />,
        filter: (tool) => !!tool.tags && tool.tags.includes("device"),
    },
    {
        name: "All Tools",
        icon: <IconTool />,
        filter: () => true,
    },
];

export default function HomePage() {
    const tools = Object.values(TOOLS_LIST).filter(x => x && !x.hidden);

    return (
        <Container>
            <Stack align="stretch" gap="xs">
                <Stack align="center" gap={4}>
                    <Group gap={4}>
                        <IconTool />
                        <Title order={3}>
                            Deniz's Tools
                        </Title>
                    </Group>
                    <Text
                        c="dimmed"
                        inline
                        span
                    >
                        Variety of useful tools I've coded
                    </Text>
                    <Anchor
                        href="https://github.com/deniz-blue/tools"
                        inline
                        fz="sm"
                        fw="bold"
                    >
                        Source <IconExternalLink size={12} />
                    </Anchor>
                </Stack>

                {sections.map((section, i) => (
                    <Stack
                        key={i}
                    >
                        <Divider
                            label={(
                                <Group gap={4}>
                                    {section.icon}
                                    <Title order={4}>
                                        {section.name}
                                    </Title>
                                </Group>
                            )}
                            labelPosition="left"
                        />

                        <SimpleGrid
                            cols={{ base: 3, xs: 4, sm: 5, md: 6 }}
                            spacing={{ base: 4, xs: "xs", sm: "md" }}
                        >
                            {tools.filter(section.filter).map(info => {
                                const Icon = info.icon || IconTool;

                                return (
                                    <Paper
                                        key={info.id}
                                        bg="dark"
                                        withBorder
                                        ta="center"
                                        className="ToolCard"
                                        py={8}
                                        px={4}
                                        component={Link}
                                        to={"/" + info.id}
                                        c="unset"
                                    >
                                        <Stack gap={4} justify="start" h="100%" align="center">
                                            <Icon size={24 * 1.5} stroke={1.5} />
                                            <Stack gap={0}>
                                                <Text fz="sm" inline span>
                                                    {info.name}
                                                </Text>
                                                <Text c="dimmed" fz="xs" inline span>
                                                    {info.desc}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </SimpleGrid>
                    </Stack>
                ))}

                <Space h="40vh" />
            </Stack>
        </Container>
    )
}
