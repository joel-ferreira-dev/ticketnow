import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "@/components/CheckoutForm";

describe("CheckoutForm", () => {
    const defaultProps = {
        eventId: 1,
        quantity: 2,
        isLoading: false,
        onSubmit: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(() => {
        defaultProps.onSubmit.mockClear();
    });

    it("renders name and email fields", () => {
        render(<CheckoutForm {...defaultProps} />);
        expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    });

    it("shows validation errors on empty submit", async () => {
        render(<CheckoutForm {...defaultProps} />);
        fireEvent.click(screen.getByRole("button", { name: /finalizar/i }));
        await waitFor(() => {
            expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
            expect(screen.getByText("E-mail é obrigatório")).toBeInTheDocument();
        });
        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("shows email format error", async () => {
        render(<CheckoutForm {...defaultProps} />);
        fireEvent.change(screen.getByLabelText(/nome completo/i), {
            target: { value: "João" },
        });
        fireEvent.change(screen.getByLabelText(/e-mail/i), {
            target: { value: "invalid" },
        });
        fireEvent.click(screen.getByRole("button", { name: /finalizar/i }));
        await waitFor(() => {
            expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
        });
    });

    it("submits with valid data", async () => {
        render(<CheckoutForm {...defaultProps} />);
        fireEvent.change(screen.getByLabelText(/nome completo/i), {
            target: { value: "João Silva" },
        });
        fireEvent.change(screen.getByLabelText(/e-mail/i), {
            target: { value: "joao@email.com" },
        });
        fireEvent.click(screen.getByRole("button", { name: /finalizar/i }));
        await waitFor(() => {
            expect(defaultProps.onSubmit).toHaveBeenCalledWith({
                eventId: 1,
                customerName: "João Silva",
                customerEmail: "joao@email.com",
                quantity: 2,
            });
        });
    });

    it("disables fields when loading", () => {
        render(<CheckoutForm {...defaultProps} isLoading />);
        expect(screen.getByLabelText(/nome completo/i)).toBeDisabled();
        expect(screen.getByLabelText(/e-mail/i)).toBeDisabled();
    });
});
