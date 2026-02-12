import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "@/components/EventCard";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
}));

const baseEvent = {
    id: 1,
    title: "Rock in Rio",
    description: "O maior festival de música",
    date: "2025-09-15T20:00:00Z",
    location: "Parque Olímpico, RJ",
    price: 595,
    imageUrl: "https://picsum.photos/seed/test/800/400",
    capacity: 100000,
    availableTickets: 2500,
    category: "Festival",
};

describe("EventCard", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it("renders event title and location", () => {
        render(<EventCard event={baseEvent} />);
        expect(screen.getByText("Rock in Rio")).toBeInTheDocument();
        expect(screen.getByText("Parque Olímpico, RJ")).toBeInTheDocument();
    });

    it("renders formatted price", () => {
        render(<EventCard event={baseEvent} />);
        expect(screen.getByText(/R\$\s*595/)).toBeInTheDocument();
    });

    it("navigates to checkout on click", () => {
        render(<EventCard event={baseEvent} />);
        fireEvent.click(screen.getByText("Comprar"));
        expect(mockPush).toHaveBeenCalledWith("/checkout/1");
    });

    it("shows sold out state when no tickets available", () => {
        const soldOutEvent = { ...baseEvent, availableTickets: 0 };
        render(<EventCard event={soldOutEvent} />);
        expect(screen.getByText("Esgotado")).toBeInTheDocument();
    });

    it("disables navigation when sold out", () => {
        const soldOutEvent = { ...baseEvent, availableTickets: 0 };
        const { container } = render(<EventCard event={soldOutEvent} />);
        fireEvent.click(container.firstChild as Element);
        expect(mockPush).not.toHaveBeenCalled();
    });
});
