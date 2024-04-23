import { Button } from "@mantine/core";

export const MantineBreakpointTester = () => {
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
};
