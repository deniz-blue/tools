import { Spotlight } from "@mantine/spotlight";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { TOOLS_LIST } from "../tools";
import { IconTool } from "@tabler/icons-react";

export const AppSpotlight = () => {
    const navigate = useNavigate();

    const toolActions = useMemo(() => {
        return Object.values(TOOLS_LIST).filter(info => !info.hidden).map((info) => {
            const Icon = info.icon || IconTool;

            return {
                id: info.id,
                label: info.name || info.id,
                description: info.desc,
                onClick: () => navigate("/" + info.id),
                leftSection: <Icon />,
            };
        })
    }, [TOOLS_LIST]);

    return (
        <Spotlight
            searchProps={{
                placeholder: `Search ${Object.values(TOOLS_LIST).filter(info => !info.hidden).length} tools...`,
            }}
            actions={[
                ...toolActions,
            ]}
            scrollable
        />
    )
};
