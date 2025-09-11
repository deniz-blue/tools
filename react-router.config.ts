import type { Config } from "@react-router/dev/config";
import { TOOL_MODULES } from "./app/tools";

const prerender = [
    "/",
    ...Object.values(TOOL_MODULES).map((mod) => `/${mod.info.id}`),
];

export default {
    ssr: false,
    prerender,
} satisfies Config;
