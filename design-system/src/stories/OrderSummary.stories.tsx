import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import OrderSummary from "@/components/OrderSummary";

const meta: Meta<typeof OrderSummary> = {
    title: "Organisms/OrderSummary",
    component: OrderSummary,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

const mockItems = [
    {
        event: {
            id: 1,
            title: "Rock in Rio 2025",
            price: 490,
            date: "2025-09-13T20:00:00Z",
            location: "Cidade do Rock",
            category: "Festival",
            description: "",
            availableTickets: 1000,
        },
        quantity: 2,
    },
];

export const Default: Story = {
    args: {
        items: mockItems,
        totalItems: 2,
        formattedTotal: "R$ 980,00",
        loading: false,
        submitError: null,
        onSubmit: () => alert("Submitting..."),
    },
    decorators: [
        (Story) => (
            <div style={{ width: "400px" }}>
                <Story />
            </div>
        ),
    ],
};

export const Loading: Story = {
    args: {
        ...Default.args,
        loading: true,
    },
    decorators: Default.decorators,
};

export const WithError: Story = {
    args: {
        ...Default.args,
        submitError: "Erro ao processar o pagamento. Verifique seu saldo.",
    },
    decorators: Default.decorators,
};
