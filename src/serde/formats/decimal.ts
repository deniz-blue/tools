import { Format } from "..";

const decimal: Format = {
    id: "decimal",
    name: "Decimal",
    ser(ascii) {
        return ascii.split("").map(s => s.charCodeAt(0)).join(" ");
    },
    de(data) {
        return data.split(/ ,/g)
            .map(n => Number(n))
            .filter(x => !isNaN(x))
            .map(n => String.fromCharCode(n))
            .join("");
    },
    isValid(data) {
        return data.split(/ ,/g).some(x => isNaN(Number(x)));
    },
}

export default decimal;
