import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import OrderSuccess from "@/components/OrderSuccess";

const meta: Meta<typeof OrderSuccess> = {
    title: "Organisms/OrderSuccess",
    component: OrderSuccess,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof OrderSuccess>;

export const Pix: Story = {
    args: {
        orderId: 12345,
        customerName: "Joel Silva",
        customerEmail: "joel@example.com",
        paymentMethod: "pix",
        totalAmount: "R$ 450,00",
        onBackToHome: () => alert("Back to home"),
    },
};

export const CreditCard: Story = {
    args: {
        ...Pix.args,
        paymentMethod: "credit_card",
    },
};
