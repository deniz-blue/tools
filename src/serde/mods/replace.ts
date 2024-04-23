import { BaseOption, Modifier, StringOption } from "../index.js";

export const ModReplace: Modifier<[StringOption & BaseOption, StringOption & BaseOption]> = {
    name: "replace",
    options: [
        { type: "string", name: "from" },
        { type: "string", name: "to" },
    ],
    run(s, [from, to]) {
        return s.replaceAll(from, to);
    },
};
