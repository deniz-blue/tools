import { Box, Container, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router";
import { TOOLS_LIST } from "../tools";

export default function ToolLayout() {
    const { pathname } = useLocation();

    const info = Object.values(TOOLS_LIST).find(x => x.id == pathname.slice(1));
    const Icon = info?.icon || Box;

    return (
        <Container>
            <Stack gap={2}>
                <Stack gap={2} align="flex-start" w="auto">
                    <Group gap={4} justify="flex-start" w="auto">
                        <Icon size={18} />
                        <Text fz="xs" fw="bold" inline span tt="uppercase">
                            {info?.name}
                        </Text>
                    </Group>
                </Stack>
                <Paper
                    bg="dark"
                    p="md"
                    radius="md"
                >
                    <Stack w="100%" align="stretch">
                        <Outlet />
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
