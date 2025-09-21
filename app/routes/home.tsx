import { Box, Button, Container, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import { TOOLS_LIST } from "../tools";
import { Link } from "react-router";
import { IconTool } from "@tabler/icons-react";

export default function HomePage() {
    const tools = Object.values(TOOLS_LIST).filter(x => x && !x.hidden);

    return (
        <Container>
            <Stack align="stretch" gap="xs">
                <Text fw="bold">
                    Showing {tools.length} tools
                </Text>

                <Stack align="stretch" gap="xs">
                    {tools.map((info) => {
                        const Icon = info.icon || IconTool;

                        return (
                            <Paper
                                key={info.id}
                                withBorder
                                bg="dark"
                                p="xs"
                                component={Link}
                                to={"/" + info.id}
                                c="unset"
                                w="100%"
                            >
                                <Group>
                                    <Icon />
                                    <Text>
                                        {info.name}
                                    </Text>
                                </Group>
                            </Paper>
                        );
                    })}
                </Stack>
            </Stack>
        </Container>
    )
}
