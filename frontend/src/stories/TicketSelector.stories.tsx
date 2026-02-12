import type { Meta, StoryObj } from "@storybook/react";
import TicketSelector from "@/components/TicketSelector";
import { useState } from "react";

const meta: Meta<typeof TicketSelector> = {
    title: "Components/TicketSelector",
    component: TicketSelector,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof TicketSelector>;

function TicketSelectorWithState({ max }: { max: number }) {
    const [qty, setQty] = useState(1);
    return <TicketSelector quantity={qty} max={max} onChange={setQty} />;
}

export const Default: Story = {
    render: () => <TicketSelectorWithState max={10} />,
};

export const LimitedStock: Story = {
    render: () => <TicketSelectorWithState max={3} />,
};
