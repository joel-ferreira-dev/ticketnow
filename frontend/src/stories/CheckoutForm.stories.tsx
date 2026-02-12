import type { Meta, StoryObj } from "@storybook/react";
import CheckoutForm from "@/components/CheckoutForm";

const meta: Meta<typeof CheckoutForm> = {
    title: "Components/CheckoutForm",
    component: CheckoutForm,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const Default: Story = {
    args: {
        eventId: 1,
        quantity: 2,
        isLoading: false,
        onSubmit: async (data) => {
            console.log("Order submitted:", data);
        },
    },
};

export const Loading: Story = {
    args: {
        eventId: 1,
        quantity: 1,
        isLoading: true,
        onSubmit: async () => { },
    },
};
