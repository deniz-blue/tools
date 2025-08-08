import { Container, Paper, Stack } from "@mantine/core";
import { Outlet } from "react-router";

export default function ToolLayout() {
    return (
        <Container>
            <Paper bg="dark" p="md">
                <Stack w="100%" align="stretch">
                    <Outlet />
                </Stack>
            </Paper>
        </Container>
    )
}
