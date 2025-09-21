import { Select } from "@mantine/core";
import { TZ_ABBREVIATIONS, TZ_INTL } from "./data";

export const TimezoneSelect = ({
    value,
    onChange,
}: {
    value: string | null;
    onChange: (v: string | null) => void;
}) => {
    return (
        <Select
            value={value}
            data={[
                ...Object.keys(TZ_ABBREVIATIONS),
                ...TZ_INTL,
            ]}
            onChange={(v) => onChange(v)}
            searchable
            clearable
        />
    )
};
