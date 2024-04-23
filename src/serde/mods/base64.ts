import { Modifier } from "../index.js";

export const ModBase64Encode: Modifier = {
    options: [],
    name: "Base64 Encode",
    run: (s) => btoa(s),
};

export const ModBase64Decode: Modifier = {
    options: [],
    name: "Base64 Decode",
    run: (s) => atob(s),
};
