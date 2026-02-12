import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Hero from "@/components/Hero";

const meta: Meta<typeof Hero> = {
    title: "Organisms/Hero",
    component: Hero,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
    args: {
        search: "",
        onSearchChange: (v) => console.log("Search:", v),
        selectedCategory: "Todos",
        onCategoryChange: (c) => console.log("Category:", c),
        categories: ["Todos", "Show", "Festival", "Teatro"],
    },
    decorators: [
        (Story) => (
            <div style={{ padding: "20px" }}>
                <Story />
            </div>
        ),
    ],
};

export const WithSearch: Story = {
    args: {
        ...Default.args,
        search: "Rock in Rio",
        selectedCategory: "Festival",
    },
    decorators: Default.decorators,
};
