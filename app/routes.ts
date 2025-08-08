import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layout/layout.tsx", [
        index("routes/home.tsx"),

        layout("layout/tool-layout.tsx", [
            route("string-length", "tools/StringLengthTool.tsx"),
            route("generate-uuid-v4", "tools/RandomUUIDv4Tool.tsx"),
            route("video-to-gif", "tools/VideoToGif.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
