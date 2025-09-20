import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { TOOLS_LIST } from "./tools";

const toolRoutes = Object.entries(TOOLS_LIST).map(([filePath, info]) => (
    route(info.id, filePath)
));

export default [
    layout("layout/layout.tsx", [
        index("routes/home.tsx"),

        layout("layout/tool-layout.tsx", toolRoutes),
    ]),
] satisfies RouteConfig;
