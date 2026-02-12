import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EventCard from "@/components/EventCard";

const meta: Meta<typeof EventCard> = {
    title: "Components/EventCard",
    component: EventCard,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div style={{ width: 360 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
    args: {
        event: {
            id: 1,
            title: "Rock in Rio 2025",
            description: "O maior festival de música do mundo está de volta com lineup incrível.",
            date: "2025-09-15T20:00:00Z",
            location: "Parque Olímpico, Rio de Janeiro",
            price: 595,
            imageUrl: "https://picsum.photos/seed/rock/800/400",
            capacity: 100000,
            availableTickets: 2500,
            category: "Festival",
        },
    },
};

export const SoldOut: Story = {
    args: {
        event: {
            id: 2,
            title: "Stand-up Comedy Night",
            description: "Uma noite de muita risada com os melhores comediantes do Brasil.",
            date: "2025-04-10T21:00:00Z",
            location: "Teatro Municipal, São Paulo",
            price: 120,
            imageUrl: "https://picsum.photos/seed/comedy/800/400",
            capacity: 500,
            availableTickets: 0,
            category: "Stand-up",
        },
    },
};

export const LowAvailability: Story = {
    args: {
        event: {
            id: 3,
            title: "Hamlet - Companhia Nacional",
            description: "Clássico de Shakespeare em montagem contemporânea premiada.",
            date: "2025-05-20T19:30:00Z",
            location: "Teatro Alfa, São Paulo",
            price: 180,
            imageUrl: "https://picsum.photos/seed/theater/800/400",
            capacity: 800,
            availableTickets: 15,
            category: "Teatro",
        },
    },
};
