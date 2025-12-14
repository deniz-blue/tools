import { Text } from "@mantine/core";
import { ParseError, renderToString } from "katex";
import { useMemo } from "react";

export const InlineMath = ({
    math,
}: {
    math: string;
}) => {
    const { html, error } = useMemo(() => {
        try {
            const html = renderToString(math);
            return { html };
        } catch (error) {
            if (error instanceof ParseError || error instanceof TypeError) {
                return { error };
            }

            throw error;
        }
    }, [math]);

    if (error) {
        console.error(error);
        return (
            <Text c="red" inline span inherit>
                {"" + error}
            </Text>
        );
    }

    if (!html) return;

    return (
        <Text
            span inline inherit
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
