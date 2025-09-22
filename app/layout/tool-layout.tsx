import { Anchor, Box, Container, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router";
import { TOOLS_LIST } from "../tools";
import { IconExternalLink } from "@tabler/icons-react";
import type { Route } from "./+types/tool-layout";

const getToolFromPathname = (pathname: string) => {
    return Object.entries(TOOLS_LIST)
        .find(([_, x]) => (
            x.id == pathname.slice(1)
        )) ?? ["", { id: "" }]
};

export const meta: Route.MetaFunction = ({ location: { pathname } }) => {
    const [_, info] = getToolFromPathname(pathname);

    const title = `${info.name || info.id} | Deniz's Tools`;

    return [
        { title },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: info.desc || "" },
    ];
};

export default function ToolLayout() {
    const { pathname } = useLocation();

    const [filepath, info] = getToolFromPathname(pathname);
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
