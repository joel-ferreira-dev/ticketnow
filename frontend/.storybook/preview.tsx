import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../src/theme/theme";

const preview: Preview = {
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        backgrounds: {
            default: "dark",
            values: [
                { name: "dark", value: "#0F0F0F" },
                { name: "light", value: "#FFFFFF" },
            ],
        },
    },
};

export default preview;
