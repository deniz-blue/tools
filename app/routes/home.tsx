import { Button, Container, Stack, Title } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";

export default function HomePage() {
    return (
        <Container>
            <Stack align="center">
                <Title order={3}>
                    Tools
                </Title>

                <Button
                    variant="light"
                    onClick={spotlight.open}
                >
                    Open Tool List/Search
                </Button>
            </Stack>
        </Container>
    )
}
