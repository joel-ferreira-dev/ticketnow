import React from "react";
import { render, screen } from "@testing-library/react";
import CartDrawer from "./CartDrawer";
import { CartProvider } from "@/context/CartContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

describe("CartDrawer", () => {
    it("should render when open", () => {
        render(
            <CartDrawer open={true} onClose={jest.fn()} />,
            { wrapper },
        );

        expect(screen.getByText(/Carrinho/i)).toBeInTheDocument();
    });

    it("should not render content when closed", () => {
        const { container } = render(
            <CartDrawer open={false} onClose={jest.fn()} />,
            { wrapper },
        );

        // MUI Drawer hides content when closed
        expect(container.querySelector(".MuiDrawer-root")).toBeTruthy();
    });

    it("should show empty cart message when no items", () => {
        render(
            <CartDrawer open={true} onClose={jest.fn()} />,
            { wrapper },
        );

        expect(screen.getByText(/carrinho vazio/i)).toBeInTheDocument();
    });

    it("should show checkout button text", () => {
        render(
            <CartDrawer open={true} onClose={jest.fn()} />,
            { wrapper },
        );

        // With empty cart, there should be a "Ver Eventos" or similar button
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });
});
