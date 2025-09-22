import type { ToolInfo } from "./tool";

export const TOOLS_LIST = import.meta.glob("./tools/**/*.tool.tsx", {
    eager: true,
    import: "info",
}) as Record<string, ToolInfo>;
