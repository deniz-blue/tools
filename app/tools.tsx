import type { ToolModule } from "./tool";

export const TOOL_MODULES = import.meta.glob("./tools/*.tsx", {
    eager: true,
}) as Record<string, ToolModule>;
