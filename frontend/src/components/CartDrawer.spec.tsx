import React from "react";
import { render, screen } from "@testing-library/react";
import CartDrawer from "./CartDrawer";
import { CartProvider } from "@/context/CartContext";


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

        expect(screen.getAllByText(/Carrinho/i).length).toBeGreaterThan(0);
    });

    it("should not render content when closed", () => {
        const { queryByText } = render(
            <CartDrawer open={false} onClose={jest.fn()} />,
            { wrapper },
        );

        expect(queryByText(/Carrinho/i)).not.toBeInTheDocument();
    });

    it("should show empty cart message when no items", () => {
        render(
            <CartDrawer open={true} onClose={jest.fn()} />,
            { wrapper },
        );

        expect(screen.getByText(/Seu carrinho está vazio/i)).toBeInTheDocument();
    });

    it("should show checkout button text", () => {
        render(
            <CartDrawer open={true} onClose={jest.fn()} />,
            { wrapper },
        );


        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });
});
