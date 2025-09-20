import type { Config } from "@react-router/dev/config";
import { TOOLS_LIST } from "./app/tools";

const prerender = [
    "/",
    ...Object.values(TOOLS_LIST).map((mod) => `/${mod.id}`),
];

export default {
    ssr: false,
    prerender,
} satisfies Config;
