import type { IconProps } from "@tabler/icons-react";
import type { ComponentType, ReactNode } from "react";

export interface ToolInfo {
    id: string;
    name?: string;
    desc?: string;
    hidden?: boolean;
    icon?: ComponentType<IconProps>;
};

export interface ToolModule {
    info: ToolInfo;
};
