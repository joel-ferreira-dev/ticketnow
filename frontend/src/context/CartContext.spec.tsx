import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "./CartContext";
import { useCart } from "../hooks/useCart";

const mockEvent = {
    id: 1,
    title: "Test Event",
    description: "A test event",
    date: "2025-06-15T20:00:00",
    location: "Test Venue",
    price: 100,
    imageUrl: "https://example.com/image.jpg",
    capacity: 1000,
    availableTickets: 500,
    category: "Show",
};

const mockEvent2 = {
    id: 2,
    title: "Another Event",
    description: "Another test event",
    date: "2025-07-15T20:00:00",
    location: "Another Venue",
    price: 200,
    imageUrl: "https://example.com/image2.jpg",
    capacity: 500,
    availableTickets: 200,
    category: "Festival",
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);


const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CartContext", () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    it("should start with empty cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.items).toEqual([]);
        expect(result.current.totalItems).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    it("should add an item to the cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 2);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].event.id).toBe(1);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.totalItems).toBe(2);
        expect(result.current.totalPrice).toBe(200);
    });

    it("should add multiple different items", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 1);
        });
        act(() => {
            result.current.addItem(mockEvent2, 3);
        });

        expect(result.current.items).toHaveLength(2);
        expect(result.current.totalItems).toBe(4);
        expect(result.current.totalPrice).toBe(100 + 600);
    });

    it("should increment quantity when adding same item", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 1);
        });
        act(() => {
            result.current.addItem(mockEvent, 2);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(3);
        expect(result.current.totalPrice).toBe(300);
    });

    it("should remove an item from the cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 2);
            result.current.addItem(mockEvent2, 1);
        });
        act(() => {
            result.current.removeItem(1);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].event.id).toBe(2);
    });

    it("should update item quantity", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 1);
        });
        act(() => {
            result.current.updateQuantity(1, 5);
        });

        expect(result.current.items[0].quantity).toBe(5);
        expect(result.current.totalPrice).toBe(500);
    });

    it("should clear the cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 2);
            result.current.addItem(mockEvent2, 3);
        });
        act(() => {
            result.current.clearCart();
        });

        expect(result.current.items).toEqual([]);
        expect(result.current.totalItems).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    it("should set expiration timer on first add", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(mockEvent, 1);
        });

        expect(result.current.expiresAt).not.toBeNull();
        expect(result.current.expiresAt!).toBeGreaterThan(Date.now());
    });
});
