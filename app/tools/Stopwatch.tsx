import { IconClock, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconX } from "@tabler/icons-react";
import type { ToolInfo } from "../tool";
import { Button, CopyButton, Group, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { ValueCopyButton } from "../components/ui/ValueCopyButton";

export const info: ToolInfo = {
    id: "stopwatch",
    name: "Stopwatch",
    icon: IconClock,
};

export default function StopwatchToolPage() {
    const displayRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<"reset" | "start" | "pause">("reset");

    const startTime = useRef<number>(0);
    const storedTime = useRef<number>(0);

    const getElapsed = () => startTime.current ? (performance.now() - startTime.current) : storedTime.current;
    const fmt = (elapsed: number) => {
        const h = Math.floor(elapsed / (1000 * 60 * 60));
        const m = Math.floor(elapsed / (1000 * 60)) % 60;
        const s = Math.floor(elapsed / (1000)) % 60;
        const ms = elapsed % 1000;
        return `${[h, m, s].map(x => x.toString().padStart(2, "0")).join(":")}.${ms.toString().padStart(3, "0")}`;
    };
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
                    {state == "pause" && (
                        <ValueCopyButton
                            {...{
                                // hack
                                get value() {
                                    return fmt(getElapsed());
                                }
                            }}
                        />
                    )}
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
        </Stack>
    )
};
