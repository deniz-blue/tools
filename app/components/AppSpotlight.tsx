import { Spotlight } from "@mantine/spotlight";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { TOOL_MODULES } from "../tools";
import { IconTool } from "@tabler/icons-react";

export const AppSpotlight = () => {
    const navigate = useNavigate();

    const toolActions = useMemo(() => {
        return Object.values(TOOL_MODULES).filter(mod => !mod.info.hidden).map((mod) => {
            const Icon = mod.info.icon || IconTool;

            return {
                id: mod.info.id,
                label: mod.info.name || mod.info.id,
                description: mod.info.desc,
                onClick: () => navigate("/" + mod.info.id),
                leftSection: <Icon />,
            };
        })
    }, [TOOL_MODULES]);

    return (
        <Spotlight
            searchProps={{
                placeholder: `Search ${Object.values(TOOL_MODULES).filter(mod => !mod.info.hidden).length} tools...`,
            }}
            actions={[
                ...toolActions,
            ]}
        />
    )
};
