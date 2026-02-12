import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/base/Button";

const meta: Meta<typeof Button> = {
    title: "Base/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Botão Padrão",
        variant: "contained",
    },
};

export const Premium: Story = {
    args: {
        children: "Ingressos VIP",
        premium: true,
        variant: "contained",
    },
};

export const Outlined: Story = {
    args: {
        children: "Ver Detalhes",
        variant: "outlined",
    },
};

export const Disabled: Story = {
    args: {
        children: "Esgotado",
        disabled: true,
        variant: "contained",
    },
};
