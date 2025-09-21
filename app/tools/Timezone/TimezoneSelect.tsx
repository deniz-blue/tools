import { Autocomplete, Select } from "@mantine/core";
import { TZ_ABBREVIATIONS, TZ_IANA } from "./data";
import { useState } from "react";
import { isValidTimezone } from "./fmt";

export const TimezoneSelect = ({
    value,
    onChange,
}: {
    value: string | null;
    onChange: (v: string | null) => void;
}) => {
    const [input, setInput] = useState(value || "");

    const onInputChange = (v: string) => {
        setInput(v);
        if(!v || isValidTimezone(v)) onChange(v || null);
    };

    return (
        <Autocomplete
            value={input}
            onChange={onInputChange}
            data={[
                ...Object.keys(TZ_ABBREVIATIONS),
                ...TZ_IANA,
            ]}
            placeholder="Pick a timezone..."
            clearable
        />
    )
};
