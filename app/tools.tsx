import type { ToolInfo, ToolModule } from "./tool";

export const TOOLS_LIST = import.meta.glob("./tools/*.tsx", {
    eager: true,
    import: "info",
}) as Record<string, ToolInfo>;
