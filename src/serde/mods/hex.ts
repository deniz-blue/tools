import { Modifier } from "../index.js";

export const ModHexadecimalEncode: Modifier<[]> = {
    name: "Hexadecimal Encode",
    options: [],
    run: (s) => {
        let arr: string[] = [];
        for (let i = 0, l = s.length; i < l; i ++) {
            let hex = Number(s.charCodeAt(i)).toString(16).padStart(2, "0");
            arr.push(hex);
        }
        return arr.join('');
    },
};

export const ModHexadecimalDecode: Modifier<[]> = {
    name: "Hexadecimal Decode",
    options: [],
    run: (s) => {
        let hex = s
            .toLowerCase()
            .split("")
            .filter(x => /[0-9a-f]/.test(x))
            .join("");

        let str = '';
        for (let i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substring(i, i+2), 16));
        return str;
    },
    isValidString: (s) => !!s.replace(/[0-9a-fA-F\w]/g, "").length,
};
