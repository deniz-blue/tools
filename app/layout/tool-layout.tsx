import { Anchor, Box, Container, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router";
import { TOOLS_LIST } from "../tools";
import { IconBrandGithub, IconExternalLink, IconShare } from "@tabler/icons-react";

export default function ToolLayout() {
    const { pathname } = useLocation();

    const [filepath, info] = Object.entries(TOOLS_LIST).find(([p, x]) => x.id == pathname.slice(1)) ?? ["", { id: "" }];
    const Icon = info?.icon || Box;

    return (
        <Container>
            <Stack gap={2}>
                <Stack gap={2} align="flex-start" w="auto">
                    <Group gap={4} justify="flex-start" w="auto">
                        <Icon size={18} />
                        <Text fz="xs" fw="bold" inline span tt="uppercase">
                            {info?.name} —{" "}
                        </Text>
                        <Anchor
                            href={`https://github.com/deniz-blue/tools/tree/main/app/${filepath}`}
                            target="_blank"
                            inherit
                            fz="xs"
                            fw="bold"
                            inline
                        >
                            Source <IconExternalLink size={10} />
                        </Anchor>
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
