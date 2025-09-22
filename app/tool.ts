import type { IconProps } from "@tabler/icons-react";
import type { ComponentType, ReactNode } from "react";

export type Tag =
    | "time"
    | "string"
    | "converter"
    | "device"
    | "image"
    | "rng"
    | "discord"
    ;

export interface ToolInfo {
    id: string;
    name?: string;
    desc?: string;
    hidden?: boolean;
    icon?: ComponentType<IconProps>;
    tags?: Tag[];
};

export interface ToolModule {
    info: ToolInfo;
};
