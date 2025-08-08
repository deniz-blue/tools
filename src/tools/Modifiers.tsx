import { Button, Grid, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { ValueCopyButton } from "../../app/components/ui/ValueCopyButton";

export const Modifiers = () => {
    const [input, setInput] = useState<string>("");

    return (
        <Stack align="center" ta="center">
            <Stack w={{ base: "100%", sm: "80%", lg: "50%" }}>
                <TextInput
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    w="100%"
                />
                <Button
                    fullWidth
                    color=""
                >
                    Add Modifier
                </Button>
                <Grid>
                    <Grid.Col span="auto">
                        <Paper
                            p="md"
                            shadow="md"
                            withBorder
                        >
                            {input}
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span="content">
                        <ValueCopyButton value={input} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Stack>

    )
};
