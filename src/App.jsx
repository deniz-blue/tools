import { Group, Stack, Title, Text, Button, Space, Tooltip, ActionIcon, Fieldset, SimpleGrid, Code, CopyButton, TextInput, Accordion, Select } from '@mantine/core'
import { IconCopy } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { DateTimePicker } from "@mantine/dates";
import { IconExternalLink } from '@tabler/icons-react';
import { IconBulb } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';

const discordTimestampFormats = {
	't': { timeStyle: 'short', _name: "Short time" },
	'T': { timeStyle: 'medium', _name: "Long time" },
	'd': { dateStyle: 'short', _name: "Short date" },
	'D': { dateStyle: 'long', _name: "Long date" },
	'f': { dateStyle: 'long', timeStyle: 'short', _name: "Long date, Short time" },
	'F': { dateStyle: 'full', timeStyle: 'short', _name: "Full length date, short time" },
	'R': { style: 'long', numeric: 'auto', _name: "Relative" },
};

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

const ActionButtonWithTooltip = ({
    label,
    color,
    icon,
    onClick,
}) => {
    return (
        <Tooltip label={label}>
            <ActionIcon
                onClick={onClick}
                color={color || "gray"}
                variant="subtle"
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}

const ValueCopyButton = ({ value }) => {
    return (
        <CopyButton value={value}>
            {({ copied, copy }) => (
                <ActionButtonWithTooltip
                    label={copied ? "Copied!" : "Copy"}
                    icon={<IconCopy />}
                    onClick={copy}
                    color={copied && "green"}
                />
            )}
        </CopyButton>
    );
}

const createConversionTool = (
    name,
    fn
) => ({
    name,
    render() {
        const [text, setText] = useState("");
        
        const converted = fn(text);

        return (
            <Stack>
                <TextInput
                    value={text}
                    onChange={e => setText(e.currentTarget.value)}
                    placeholder={name}
                />
                {text.length ? (
                    <Group>
                        <Code>{converted}</Code>
                        <ValueCopyButton value={converted} />
                    </Group>
                ) : null}
            </Stack>
        );
    },
});

const Tools = [
    {
        name: "RNG-like",
        tools: [
            {
                name: "Random UUID (v4)",
                render: () => {
                    const [UUID, setUUID] = useState(uuidv4());
        
                    return (
                        <Group justify='space-between' align="center">
                            <Code>{UUID}</Code>
                            <Group justify='center'>
                                <ValueCopyButton value={UUID} />
                                <ActionButtonWithTooltip
                                    label="Another, please"
                                    icon={<IconReload />}
                                    onClick={() => setUUID(uuidv4())}
                                />
                            </Group>
                        </Group>
                    );
                },
            },
        ],
    },
    {
        name: "Data Conversions",
        tools: [
            createConversionTool("Ascii -> Hex", (str) => {
                let arr = [];
                for (let i = 0, l = str.length; i < l; i ++) {
                    let hex = Number(str.charCodeAt(i)).toString(16);
                    arr.push(hex);
                }
                return arr.join('');
            }),
            createConversionTool("Hex -> Ascii", (hex) => {
                var str = '';
                for (var i = 0; i < hex.length; i += 2)
                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                return str;
            }),
            createConversionTool("Binary -> Decimal", (b) => parseInt(b, 2)),
            createConversionTool("Decimal -> Binary", (b) => isNaN(b) ? "Invalid" : Number(b).toString(2)),
            createConversionTool("Ascii -> Base64", (b) => btoa(b)),
            createConversionTool("Base64 -> Ascii", (b) => atob(b)),
        ],
    },
    {
        name: "Date & Time",
        tools: [
            {
                name: "Discord Timestamp Generator",
                render() {
                    const [value, setValue] = useState(new Date());
                    const [type, setType] = useState("R");
        
                    let selectedDate = new Date(value.getTime() + new Date().getTimezoneOffset() * 60000);
                    let ts = selectedDate.getTime().toString();
                    let output = `<t:${ts.substring(0, ts.length - 3)}:${type}>`;
        
                    let preview;
                    if (value) {
                        let formatter = new Intl[type == "R" ? "RelativeTimeFormat" : "DateTimeFormat"](navigator.language || 'en', discordTimestampFormats[type] || {});
                        if (type == "R") {
                            const format = automaticRelativeDifference(selectedDate);
                            preview = formatter.format(format.duration, format.unit);
                        } else {
                            preview = formatter.format(selectedDate);
                        }
                    } 
        
                    return (
                        <Stack>
                            <Group align='start' grow>
                                <DateTimePicker
                                    label="Date/Time"
                                    value={value}
                                    onChange={(v) => setValue(v)}
                                />
                                <Select
                                    label="Format"
                                    data={Object.entries(discordTimestampFormats).map(([t, { _name }]) => ({
                                        value: t,
                                        label: _name,
                                    }))}
                                    value={type}
                                    onChange={(v) => setType(v)}
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
            },
            {
                name: "Unix Timestamp",
                render() {
                    const [value, setValue] = useState(new Date());

                    const output = value.getTime().toString();

                    return (
                        <Stack>
                            <DateTimePicker
                                label="Date/Time"
                                value={value}
                                onChange={(v) => setValue(v)}
                            />
                            <Group justify='center'>
                                <Code>{output}</Code>
                                <ValueCopyButton value={output} />
                            </Group>
                        </Stack>
                    );
                }
            },
        ],
    },
    {
        name: "Web Dev Utilities",
        tools: [
            {
                name: "Mantine Breakpoint Tester",
                render: () => {
                    const colors = {
                        base: "grape",
                        xs: "violet",
                        sm: "blue",
                        md: "teal",
                        lg: "green",
                        xl: "lime",
                    };
        
                    return (
                        <>
                            {["base", "xs", "sm", "md", "lg", "xl"].map((key, i, li) => (
                                <Button color={colors[key]} variant="light" fullWidth visibleFrom={key} hiddenFrom={li[i+1]}>
                                    {key}
                                </Button>
                            ))}
                        </>
                    );
                }
            },
        ],
    },
];



const App = () => {
    const [search, setSearch] = useState("");

    const filteredTools = Tools.map(
        (category) => ({
            ...category,
            tools: category.tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())),
        })
    ).filter(c => c.tools.length);

    return (
        <Stack align="center" p="md">
            <Space h="xl" />
            <Title>Dennis' Tools</Title>

            <Group>
                {[
                    {
                        label: "View My Other Projects",
                        ico: <IconExternalLink />,
                        link: "https://thealan404.github.io/",
                    },
                    {
                        label: "Tool idea? Open an issue!",
                        ico: <IconBulb />,
                        color: "green",
                        link: "https://github.com/TheAlan404/tools/issues",
                    },
                    {
                        label: "View Github Repository",
                        ico: <IconBrandGithub />,
                        color: "dark",
                        link: "https://github.com/TheAlan404/tools/",
                    },
                ].map((l, i) => (<Tooltip label={l.label}>
                    <ActionIcon component="a" variant="subtle" href={l.link} color={l.color}>
                        {l.ico}
                    </ActionIcon>
                </Tooltip>))}
            </Group>

            <Text>
                here are some convenient tools i guess
            </Text>

            <TextInput
                label="Search"
                placeholder='Filter for tools by name'
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
                w={{ base: "80%", md: "50%", xl: "40%" }}
            />

            <Accordion multiple w={{ base: "100%", md: "80%", xl: "60%" }}>
                {filteredTools.map((category, i) => (
                    <Accordion.Item value={category.name} key={i}>
                        <Accordion.Control icon={category.icon}>
                            {category.name}
                        </Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
                                {category.tools.map(({ name, render: Component }, ii) => (
                                    <Fieldset legend={name}>
                                        <Component />
                                    </Fieldset>
                                ))}
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Space h="30vh" />
        </Stack>
    )
}

export default App
