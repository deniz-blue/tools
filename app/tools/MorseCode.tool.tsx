import { Stack } from "@mantine/core";
import type { ToolInfo } from "../tool";
import { StringInput } from "../components/input/StringInput";
import { useState } from "react";
import { ResultsTable } from "../components/output/ResultsTable";
import { IconDots } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "morse",
    name: "Morse Code",
    icon: IconDots,
    desc: "Morse Code <-> Text",
    tags: ["string", "converter"],
};

const MORSE_TO_LETTER = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    "--..--": ",",
    "..--..": "?",
    "-.-.-.": ";",
    "---...": ":",
    "-....-": "-",
    "-..-.": "/",
    ".----.": "'",
    "-.-.--": "!",
} as { [k: string]: string };

const LETTER_TO_MORSE = Object.fromEntries(Object.entries(MORSE_TO_LETTER).map(([a, b]) => [b, a]));

const isMorseCode = (v: string) => !!v && !v.replace(/[ \-\.\/]/g, "").length;

const toMorseCode = (s: string) => {
    return s.split(" ")
        .map(word => (
            word.split("")
                .map(letter => LETTER_TO_MORSE[letter] || "?")
                .join(" ")
        ))
        .join(" / ")
};

const morseCodeToText = (s: string) => {
    return s.split("/")
        .map(word => (
            word.split(" ")
                .map(letter => MORSE_TO_LETTER[letter] || "")
        ))
        .join(" ");
};

const uniqueOnly = <T,>(arr: T[]) => [...new Set(arr)];

export default function MorseCode() {
    const [value, setValue] = useState("");

    const isMorse = isMorseCode(value);

    const unsupported = uniqueOnly(
        isMorse ? (
            value.split(/[\/ ]/g)
                .filter(letter => !MORSE_TO_LETTER[letter])
        ) : (
            value
                .split("")
                .filter(x => x !== " " && !Object.keys(LETTER_TO_MORSE).includes(x.toUpperCase()))
        )
    );

    return (
        <Stack>
            <StringInput
                label="Message or Morse Code"
                error={unsupported.length ? `Unsupported: ${unsupported.join(" ")}` : null}
                value={value}
                onChange={setValue}
                styles={{ input: { fontFamily: "monospace" } }}
                autoFocus
            />

            <ResultsTable
                data={[
                    isMorse ? [
                        "Message",
                        morseCodeToText(value),
                    ] : [
                        "Morse Code",
                        toMorseCode(value.toUpperCase()),
                    ],
                ]}
            />
        </Stack>
    )
}
