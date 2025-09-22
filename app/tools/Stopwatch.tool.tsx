import { IconClock, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconX } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import { Button, CopyButton, Group, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { ValueCopyButton } from "../components/ui/ValueCopyButton";
import { useListState } from "@mantine/hooks";
import { ResultsTable } from "../components/output/ResultsTable";

export const info: ToolInfo = {
    id: "stopwatch",
    name: "Stopwatch",
    icon: IconClock,
    desc: "Measure time [now]!",
    tags: ["time"],
};

interface Stage {

};

const fmt = (elapsed: number) => {
    const h = Math.floor(elapsed / (1000 * 60 * 60));
    const m = Math.floor(elapsed / (1000 * 60)) % 60;
    const s = Math.floor(elapsed / (1000)) % 60;
    const ms = Math.floor(elapsed) % 1000;
    return `${[h, m, s].map(x => x.toString().padStart(2, "0")).join(":")}.${ms.toString().padStart(3, "0")}`;
};

export default function StopwatchToolPage() {
    const displayRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<"reset" | "start" | "pause">("reset");
    const [mode, setMode] = useState<"marks" | "stages">("marks");
    const [marks, { append: addMark, setState: setMarks }] = useListState<number>([]);
    const [stages,] = useListState<Stage>([]);

    const startTime = useRef<number>(0);
    const storedTime = useRef<number>(0);

    const getElapsed = () => startTime.current ? (performance.now() - startTime.current) : storedTime.current;

    const raf = useRef<number>(null);
    const updateDisplay = () => {
        const elapsed = getElapsed();
        if (displayRef.current) {
            displayRef.current.innerText = fmt(elapsed);
        };
    };
    const startDisplay = () => {
        const f = () => {
            updateDisplay();
            raf.current = requestAnimationFrame(f);
        };
        f();
    };
    const stopDisplay = () => {
        if (raf.current) cancelAnimationFrame(raf.current);
    };

    const start = () => {
        startTime.current = performance.now() - storedTime.current;
        setState("start");
        startDisplay();
    };

    const reset = () => {
        stopDisplay();
        storedTime.current = 0;
        startTime.current = 0;
        setState("reset");
        updateDisplay();
        // setMarks([]);
    };

    const pause = () => {
        stopDisplay();
        storedTime.current = getElapsed();
        startTime.current = 0;
        setState("pause");
        updateDisplay();
    };

    return (
        <Stack>
            <Stack align="center">
                <Group>
                    <Text
                        span
                        ff="monospace"
                        fw="bold"
                        fz="xl"
                        ref={displayRef}
                    >
                        00:00:00.000
                    </Text>
                    <ValueCopyButton
                        disabled={state !== "pause"}
                        {...{
                            // hack... i dont think it actually works but oh well
                            get value() {
                                return fmt(getElapsed());
                            }
                        }}
                    />
                </Group>

                <Group>
                    {state !== "start" ? (
                        <Button
                            variant="light"
                            color="green"
                            leftSection={<IconPlayerPlay />}
                            onClick={start}
                        >
                            Start
                        </Button>
                    ) : (
                        <Button
                            variant="light"
                            color="yellow"
                            leftSection={<IconPlayerPause />}
                            onClick={pause}
                        >
                            Pause
                        </Button>
                    )}

                    <Button
                        variant="light"
                        color="red"
                        leftSection={<IconPlayerStop />}
                        onClick={reset}
                        disabled={state == "reset"}
                    >
                        Reset
                    </Button>
                </Group>
            </Stack>

            <Stack>
                <Tabs allowTabDeactivation>
                    <Tabs.List justify="center" mb="xs">
                        <Tabs.Tab value="marks">
                            Marks
                        </Tabs.Tab>
                        <Tabs.Tab value="stages" disabled>
                            Stages
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="marks">
                        <Stack align="center">
                            <Stack maw="30rem">
                                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                                    <Button
                                        variant="light"
                                        color="blue"
                                        // leftSection={<IconPlayerStop />}
                                        onClick={() => addMark(getElapsed())}
                                        disabled={state == "reset"}
                                        fullWidth
                                    >
                                        Add Mark
                                    </Button>
                                    <Button
                                        variant="light"
                                        color="red"
                                        onClick={() => setMarks([])}
                                        disabled={!marks.length}
                                        fullWidth
                                    >
                                        Clear
                                    </Button>
                                </SimpleGrid>

                                <ResultsTable
                                    data={marks.map(mark => [fmt(mark), mark.toString()] as const)}
                                />
                            </Stack>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>



            </Stack>
        </Stack>
    )
};
