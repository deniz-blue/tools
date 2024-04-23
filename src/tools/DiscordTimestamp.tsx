import { Group, Stack, Text, Code, Select } from '@mantine/core'
import { useState } from "react";
import { ValueCopyButton } from "../components/ValueCopyButton";
import { DateTimePicker } from "@mantine/dates";

const discordTimestampFormats = {
	't': { timeStyle: 'short', _name: "Short time" },
	'T': { timeStyle: 'medium', _name: "Long time" },
	'd': { dateStyle: 'short', _name: "Short date" },
	'D': { dateStyle: 'long', _name: "Long date" },
	'f': { dateStyle: 'long', timeStyle: 'short', _name: "Long date, Short time" },
	'F': { dateStyle: 'full', timeStyle: 'short', _name: "Full length date, short time" },
	'R': { style: 'long', numeric: 'auto', _name: "Relative" },
};

type TimestampFormat = keyof typeof discordTimestampFormats;

function automaticRelativeDifference(d) {
	const diff = -((new Date().getTime() - d.getTime())/1000)|0;
	const absDiff = Math.abs(diff);
	console.log(diff);
	if (absDiff > 86400*30*10) {
		return { duration: Math.round(diff/(86400*365)), unit: 'years' };
	}
	if (absDiff > 86400*25) {
		return { duration: Math.round(diff/(86400*30)), unit: 'months' };
	}
	if (absDiff > 3600*21) {
		return { duration: Math.round(diff/86400), unit: 'days' };
	}
	if (absDiff > 60*44) {
		return { duration: Math.round(diff/3600), unit: 'hours' };
	}
	if (absDiff > 30) {
		return { duration: Math.round(diff/60), unit: 'minutes' };
	}
	return { duration: diff, unit: 'seconds' };
}

export const DiscordTimestampGenerator = () => {
    const [value, setValue] = useState(new Date());
    const [type, setType] = useState<TimestampFormat>("R");

    let selectedDate = new Date(value.getTime() + new Date().getTimezoneOffset() * 60000);
    let ts = selectedDate.getTime().toString();
    let output = `<t:${ts.substring(0, ts.length - 3)}:${type}>`;

    let preview;
    if (value) {
        // @ts-ignore
        let formatter = new Intl[type == "R" ? "RelativeTimeFormat" : "DateTimeFormat"](navigator.language || 'en', discordTimestampFormats[type] || {});
        if (type == "R") {
            const format = automaticRelativeDifference(selectedDate);
            // @ts-ignore
            preview = formatter.format(format.duration, format.unit);
        } else {
            // @ts-ignore
            preview = formatter.format(selectedDate);
        }
    }

    return (
        <Stack>
            <Group align='start' grow>
                <DateTimePicker
                    label="Date/Time"
                    value={value}
                    onChange={(v) => v && setValue(v)}
                />
                <Select
                    label="Format"
                    data={Object.entries(discordTimestampFormats).map(([t, { _name }]) => ({
                        value: t,
                        label: _name,
                    }))}
                    value={type}
                    onChange={(v) => setType(v as TimestampFormat)}
                />
            </Group>
            <Group justify="space-between">
                <Text fw="bold">Preview:</Text>
                <Text>{preview}</Text>
            </Group>
            <Group justify='center'>
                <Code>{output}</Code>
                <ValueCopyButton value={output} />
            </Group>
        </Stack>
    );
}