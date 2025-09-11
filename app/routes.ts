import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { TOOL_MODULES } from "./tools";

const toolRoutes = Object.entries(TOOL_MODULES).map(([filePath, mod]) => (
    route(mod.info.id, filePath)
));

export default [
    layout("layout/layout.tsx", [
        index("routes/home.tsx"),

        layout("layout/tool-layout.tsx", toolRoutes),
    ]),
] satisfies RouteConfig;
