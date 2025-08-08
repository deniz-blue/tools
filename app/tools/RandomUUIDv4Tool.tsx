import { RandomFunctionTool } from "../components/ui/RandomFunctionTool";
import { v4 } from "uuid";

export default function RandomUUIDv4Tool() {
    return (
        <RandomFunctionTool
            fn={v4}
        />
    )
}
