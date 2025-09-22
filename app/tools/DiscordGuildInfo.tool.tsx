import { Button, Collapse, Group, Loader, Stack, Text, TextInput } from "@mantine/core";
import type { ToolInfo } from "../tool";
import { IconBrandDiscord, IconExternalLink } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useAsyncFn } from "../hooks/utils/useAsyncFn";
import { ResultsTable } from "../components/output/ResultsTable";

export const info: ToolInfo = {
    id: "discord-guild",
    name: "Discord Guild Info",
    icon: IconBrandDiscord,
    desc: "Widget API",
    tags: ["discord"],
};

const WIDGET_DISABLED = 50004;

type APIError = {
    code: number;
    message: string;
};

type APISuccess = {
    id: string;
    name: string;
    instant_invite: string;
    channels: any[];
    members: any[];
    presence_count: number;
};

type APIResponse = APIError | APISuccess;

export default function DiscordGuildInfo() {
    const [guildId, setGuildId] = useState("");
    const [guildInfo, setGuildInfo] = useState<APISuccess | null>(null);
    const [apiError, setApiError] = useState<APIError | null>(null);

    const [fetchGuildInfo, { error, running }] = useAsyncFn(async (signal?: AbortSignal) => {
        const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
            signal,
        });
        const json = await res.json() as APIError | APISuccess;
        if("code" in json) {
            setApiError(json);
        } else {
            setGuildInfo(json);
        }
    });

    useEffect(() => {
        setGuildInfo(null);
        setApiError(null);
        const ctrl = new AbortController();
        if(!!guildId) fetchGuildInfo(ctrl.signal);
        return () => ctrl.abort();
    }, [guildId]);

    return (
        <Stack align="center">
            <TextInput
                label="Guild ID"
                value={guildId}
                onChange={e => setGuildId(e.currentTarget.value)}
            />

            <Collapse in={running}>
                <Loader />
            </Collapse>

            <Collapse in={!!error}>
                <Text c="red">
                    {""+error}
                </Text>
            </Collapse>

            <Collapse in={!!apiError}>
                <Text c="red">
                    {apiError?.message}
                </Text>
            </Collapse>

            <ResultsTable
                data={[
                    (!!guildInfo?.name) ? ["Guild Name", guildInfo.name] : null,
                    (!!guildInfo?.presence_count) ? ["Presence Count", guildInfo.presence_count.toString()] : null,
                    (!!guildInfo?.instant_invite) ? ["Instant Invite", guildInfo.instant_invite] : null,
                    ["Dynamic Invite (deniz.blue)", `https://deniz.blue/discord-invite?id=${guildId}`],
                    ["Dynamic Invite (Joshix-1)", `https://joshix-1.github.io/invite/?id=${guildId}`],
                ]}
            />

            <Stack align="center" gap={4}>
                <Text fw="bold" fz="sm">
                    Possible server listings:
                </Text>

                <Group gap={4}>
                    {[
                        "https://discordservers.me/servers/",
                        "https://disboard.org/server/",
                        "https://top.gg/servers/",
                    ].map(link => (
                        <Button
                            variant="light"
                            color="dimmed"
                            rightSection={<IconExternalLink />}
                            size="compact-sm"
                            key={link}
                            component="a"
                            href={link + guildId}
                            disabled={!guildId}
                        >
                            {new URL(link).hostname}
                        </Button>
                    ))}
                </Group>
            </Stack>
        </Stack>
    );
}
