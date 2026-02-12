import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AnimatedSection from "@/components/base/AnimatedSection";
import { Typography, Paper } from "@mui/material";

const meta: Meta<typeof AnimatedSection> = {
    title: "Base/AnimatedSection",
    component: AnimatedSection,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof AnimatedSection>;

export const Default: Story = {
    args: {
        children: (
            <Paper sx={{ p: 4, borderRadius: "1px", border: "1px solid", borderColor: "divider" }}>
                <Typography variant="h5">Este conteúdo surgiu com animação!</Typography>
                <Typography color="text.secondary">Recarregue para ver o efeito de revelação.</Typography>
            </Paper>
        ),
        delay: 0,
    },
};

export const Delayed: Story = {
    args: {
        ...Default.args,
        delay: 500,
    },
};
