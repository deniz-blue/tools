import { RandomFunctionTool } from "../components/ui/RandomFunctionTool";
import { v4 } from "uuid";
import type { ToolInfo } from "../tool";

export default function RandomUUIDv4Tool() {
    return (
        <RandomFunctionTool
            fn={v4}
            generateOnMount
        />
    )
}

export const info: ToolInfo = {
    id: "generate-uuid-v4",
    name: "Generate UUID v4",
};
