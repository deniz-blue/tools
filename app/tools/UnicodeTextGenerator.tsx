import { Stack } from "@mantine/core";
import type { ToolInfo } from "../tool";
import { StringInput } from "../components/input/StringInput";
import { ResultsTable } from "../components/output/ResultsTable";
import { useState } from "react";
import { IconLetterCase } from "@tabler/icons-react";

export const info: ToolInfo = {
    id: "unicode-text",
    name: "Unicode Text Generator",
    icon: IconLetterCase,
};

const generators = [
    {
        label: "Small Caps",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ",
    },
    {
        label: "Superscript",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ",
    },
    {
        label: "Subscript",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."ₐᵦ𝒸𝒹ₑ𝒻𝓰ₕᵢⱼₖₗₘₙₒₚᵩᵣₛₜᵤᵥ𝓌ₓᵧ𝓏"],
    },
    {
        label: "Fancy",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"],
    },
    {
        label: "Fancy Bold",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"],
    },
    {
        label: "Cursive",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"],
    },
    {
        label: "Cursive Bold",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"],
    },
    {
        label: "Doubles",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"],
    },
    {
        label: "Wide",
        from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        to: [..."ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"],
    },

    // ! doesnt work
    // {
    //     label: "Wingdings",
    //     from: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    //     to: [..."♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎🙰🙵●︎❍︎■︎□︎◻︎❑︎❒︎⬧︎⧫︎◆︎❖︎⬥︎⌧︎⍓︎⌘︎"],
    // },
];

export default function UnicodeTextGenerator() {
    const [value, setValue] = useState("");

    return (
        <Stack>
            <StringInput
                placeholder="Text (case-insensitive!)"
                value={value}
                onChange={setValue}
            />

            <ResultsTable
                data={generators.map(gen => {
                    let replaced = value.split("").map(char => char.toUpperCase()).map(char => (
                        gen.from.includes(char) ? gen.to[gen.from.indexOf(char)] : char
                    )).join("");

                    return [
                        gen.label,
                        replaced,
                    ];
                })}
                valueProps={{
                    ff: "text",
                }}
            />
        </Stack>
    )
}
