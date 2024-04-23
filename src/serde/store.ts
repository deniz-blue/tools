import { ModBase64Decode, ModBase64Encode } from "./mods/base64.js";
import { ModBinaryDecode, ModBinaryEncode } from "./mods/binary.js";
import { ModHexadecimalDecode, ModHexadecimalEncode } from "./mods/hex.js";
import { ModReplace } from "./mods/replace.js";

export default [
    ModReplace,
    ModBase64Encode,
    ModBase64Decode,
    ModBinaryEncode,
    ModBinaryDecode,
    ModHexadecimalEncode,
    ModHexadecimalDecode,
];
