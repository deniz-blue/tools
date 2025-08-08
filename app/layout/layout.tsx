import { AppShell, Box, Button, Code, Group, Input, Kbd, Paper, Text } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import { Link, Outlet } from "react-router";
import { AppSpotlight } from "../components/AppSpotlight";

export default function Layout() {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="sm"
        >
            <AppSpotlight />

            <AppShell.Header>
                <Group align="center" justify="space-between" h="100%" w="100%" px="sm">
                    <Button
                        variant="subtle"
                        component={Link}
                        to="/"
                    >
                        Deniz's Tools
                    </Button>

                    <Input
                        flex="1"
                        maw="50vw"
                        component="button"
                        pointer
                        onClick={spotlight.open}
                        rightSection={(
                            <Paper fz="sm" fw="bold" mr="xs">
                                Ctrl + K
                            </Paper>
                        )}
                        rightSectionWidth="auto"
                    >
                        <Text c="dimmed">
                            Search
                        </Text>
                    </Input>

                    <Box />
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
