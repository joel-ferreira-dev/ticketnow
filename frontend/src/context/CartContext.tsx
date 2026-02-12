"use client";

import { createContext, useReducer, useEffect, useCallback, useRef, ReactNode } from "react";
import { Event, CartItem } from "@/types";

interface CartState {
    items: CartItem[];
    expiresAt: number | null;
}

type CartAction =
    | { type: "ADD_ITEM"; event: Event; quantity: number }
    | { type: "REMOVE_ITEM"; eventId: number }
    | { type: "UPDATE_QUANTITY"; eventId: number; quantity: number }
    | { type: "CLEAR_CART" }
    | { type: "LOAD_CART"; state: CartState };

const CART_KEY = "ticketnow_cart";
const RESERVATION_MINUTES = 10;

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((i) => i.event.id === action.event.id);
            const newItems = existing
                ? state.items.map((i) =>
                    i.event.id === action.event.id
                        ? { ...i, quantity: Math.min(i.quantity + action.quantity, i.event.availableTickets) }
                        : i
                )
                : [...state.items, { event: action.event, quantity: action.quantity }];
            return {
                items: newItems,
                expiresAt: state.expiresAt || Date.now() + RESERVATION_MINUTES * 60 * 1000,
            };
        }
        case "REMOVE_ITEM": {
            const newItems = state.items.filter((i) => i.event.id !== action.eventId);
            return {
                items: newItems,
                expiresAt: newItems.length === 0 ? null : state.expiresAt,
            };
        }
        case "UPDATE_QUANTITY": {
            if (action.quantity <= 0) {
                const newItems = state.items.filter((i) => i.event.id !== action.eventId);
                return {
                    items: newItems,
                    expiresAt: newItems.length === 0 ? null : state.expiresAt,
                };
            }
            return {
                ...state,
                items: state.items.map((i) =>
                    i.event.id === action.eventId
                        ? { ...i, quantity: Math.min(action.quantity, i.event.availableTickets) }
                        : i
                ),
            };
        }
        case "CLEAR_CART":
            return { items: [], expiresAt: null };
        case "LOAD_CART":
            return action.state;
        default:
            return state;
    }
}

interface CartContextType {
    items: CartItem[];
    expiresAt: number | null;
    addItem: (event: Event, quantity?: number) => void;
    removeItem: (eventId: number) => void;
    updateQuantity: (eventId: number, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
    isExpired: boolean;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    expiresAt: null,
    addItem: () => { },
    removeItem: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    totalPrice: 0,
    totalItems: 0,
    isExpired: false,
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], expiresAt: null });
    const loaded = useRef(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_KEY);
            if (saved) {
                const parsed: CartState = JSON.parse(saved);
                if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                    localStorage.removeItem(CART_KEY);
                } else if (parsed.items.length > 0) {
                    dispatch({ type: "LOAD_CART", state: parsed });
                }
            }
        } catch {
            localStorage.removeItem(CART_KEY);
        }
        loaded.current = true;
    }, []);

    useEffect(() => {
        if (!loaded.current) return;
        if (state.items.length > 0) {
            localStorage.setItem(CART_KEY, JSON.stringify(state));
        } else {
            localStorage.removeItem(CART_KEY);
        }
    }, [state]);

    const addItem = useCallback((event: Event, quantity = 1) => {
        dispatch({ type: "ADD_ITEM", event, quantity });
    }, []);

    const removeItem = useCallback((eventId: number) => {
        dispatch({ type: "REMOVE_ITEM", eventId });
    }, []);

    const updateQuantity = useCallback((eventId: number, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", eventId, quantity });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR_CART" });
    }, []);

    const totalPrice = state.items.reduce((sum, i) => sum + i.event.price * i.quantity, 0);
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const isExpired = state.expiresAt ? Date.now() > state.expiresAt : false;

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                expiresAt: state.expiresAt,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalPrice,
                totalItems,
                isExpired,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
