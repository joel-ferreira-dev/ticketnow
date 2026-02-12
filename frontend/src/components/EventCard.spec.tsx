import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "./EventCard";
import { CartProvider } from "@/context/CartContext";
import { Event } from "@/types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockEvent: Event = {
    id: 1,
    title: "Rock in Rio 2025",
    description: "O maior festival de música do mundo",
    date: "2025-09-15T16:00:00",
    location: "Parque Olímpico, Rio de Janeiro",
    price: 595,
    imageUrl: "https://picsum.photos/seed/rockinrio/800/400",
    capacity: 100000,
    availableTickets: 2500,
    category: "Festival",
};

const soldOutEvent: Event = {
    ...mockEvent,
    id: 2,
    title: "Sold Out Event",
    availableTickets: 0,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

describe("EventCard", () => {
    it("should render event title", () => {
        render(<EventCard event={mockEvent} />, { wrapper });
        expect(screen.getByText("Rock in Rio 2025")).toBeInTheDocument();
    });

    it("should render event location", () => {
        render(<EventCard event={mockEvent} />, { wrapper });
        expect(screen.getByText(/Rio de Janeiro/i)).toBeInTheDocument();
    });

    it("should render event price", () => {
        render(<EventCard event={mockEvent} />, { wrapper });
        expect(screen.getByText(/595/)).toBeInTheDocument();
    });

    it("should render category chip", () => {
        render(<EventCard event={mockEvent} />, { wrapper });
        expect(screen.getByText("Festival")).toBeInTheDocument();
    });

    it("should show Adicionar button for available events", () => {
        render(<EventCard event={mockEvent} />, { wrapper });
        expect(screen.getByText("Adicionar")).toBeInTheDocument();
    });

    it("should show Esgotado for sold out events", () => {
        render(<EventCard event={soldOutEvent} />, { wrapper });
        expect(screen.getByText("Esgotado")).toBeInTheDocument();
    });

    it("should not show Adicionar button for sold out events", () => {
        render(<EventCard event={soldOutEvent} />, { wrapper });
        expect(screen.queryByText("Adicionar")).not.toBeInTheDocument();
    });
});
