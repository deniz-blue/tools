import { RandomFunctionTool } from "../components/ui/RandomFunctionTool";
import { v4 } from "uuid";
import type { ToolInfo } from "../tool";
import { IconTag } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "generate-uuid-v4",
    name: "Generate UUID v4",
    icon: IconTag,
    tags: ["rng"],
};

export default function RandomUUIDv4Tool() {
    return (
        <RandomFunctionTool
            fn={v4}
            generateOnMount
        />
    )
}

