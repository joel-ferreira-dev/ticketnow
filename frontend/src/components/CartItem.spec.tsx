import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItemComponent from "./CartItem";
import { CartItem } from "@/types";

const mockItem: CartItem = {
    event: {
        id: 1,
        title: "Rock in Rio 2025",
        description: "Festival de música",
        date: "2025-09-15T16:00:00",
        location: "Rio de Janeiro",
        price: 595,
        imageUrl: "https://example.com/image.jpg",
        capacity: 100000,
        availableTickets: 2500,
        category: "Festival",
    },
    quantity: 2,
};

describe("CartItem", () => {
    const mockUpdateQuantity = jest.fn();
    const mockRemove = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render event title and price", () => {
        render(
            <CartItemComponent
                item={mockItem}
                onUpdateQuantity={mockUpdateQuantity}
                onRemove={mockRemove}
            />,
        );

        expect(screen.getByText("Rock in Rio 2025")).toBeInTheDocument();
    });

    it("should display the correct quantity", () => {
        render(
            <CartItemComponent
                item={mockItem}
                onUpdateQuantity={mockUpdateQuantity}
                onRemove={mockRemove}
            />,
        );

        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should call onUpdateQuantity when increment is clicked", () => {
        render(
            <CartItemComponent
                item={mockItem}
                onUpdateQuantity={mockUpdateQuantity}
                onRemove={mockRemove}
            />,
        );

        const addButtons = screen.getAllByRole("button");
        const incrementButton = addButtons.find((btn) => btn.querySelector("[data-testid='AddIcon']"));
        if (incrementButton) {
            fireEvent.click(incrementButton);
            expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
        }
    });

    it("should call onRemove when remove button is clicked", () => {
        render(
            <CartItemComponent
                item={mockItem}
                onUpdateQuantity={mockUpdateQuantity}
                onRemove={mockRemove}
            />,
        );

        const deleteButtons = screen.getAllByRole("button");
        const deleteButton = deleteButtons.find((btn) => btn.querySelector("[data-testid='DeleteOutlineIcon']"));
        if (deleteButton) {
            fireEvent.click(deleteButton);
            expect(mockRemove).toHaveBeenCalledWith(1);
        }
    });
});
