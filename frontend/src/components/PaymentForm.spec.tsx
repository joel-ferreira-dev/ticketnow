import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import { PaymentMethod, CardData } from "@/types";

describe("PaymentForm", () => {
    const mockCardData: CardData = { number: "", name: "", expiry: "", cvv: "" };
    const mockOnPaymentMethodChange = jest.fn();
    const mockOnCardDataChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render Pix and Credit Card options", () => {
        render(
            <PaymentForm
                paymentMethod="pix"
                onPaymentMethodChange={mockOnPaymentMethodChange}
                cardData={mockCardData}
                onCardDataChange={mockOnCardDataChange}
                errors={{}}
            />,
        );

        expect(screen.getByText("Pix")).toBeInTheDocument();
        expect(screen.getByText(/Cartão de Crédito/i)).toBeInTheDocument();
    });

    it("should show QR code section when Pix is selected", () => {
        render(
            <PaymentForm
                paymentMethod="pix"
                onPaymentMethodChange={mockOnPaymentMethodChange}
                cardData={mockCardData}
                onCardDataChange={mockOnCardDataChange}
                errors={{}}
            />,
        );

        expect(screen.getByText(/QR Code/i)).toBeInTheDocument();
    });

    it("should show card fields when Credit Card is selected", () => {
        render(
            <PaymentForm
                paymentMethod="credit_card"
                onPaymentMethodChange={mockOnPaymentMethodChange}
                cardData={mockCardData}
                onCardDataChange={mockOnCardDataChange}
                errors={{}}
            />,
        );

        expect(screen.getByLabelText(/Número do cartão/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nome no cartão/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Validade/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    });

    it("should display card errors when provided", () => {
        const errors = {
            cardNumber: "Número do cartão incompleto",
            cardName: "Nome no cartão é obrigatório",
        };

        render(
            <PaymentForm
                paymentMethod="credit_card"
                onPaymentMethodChange={mockOnPaymentMethodChange}
                cardData={mockCardData}
                onCardDataChange={mockOnCardDataChange}
                errors={errors}
            />,
        );

        expect(screen.getByText("Número do cartão incompleto")).toBeInTheDocument();
        expect(screen.getByText("Nome no cartão é obrigatório")).toBeInTheDocument();
    });

    it("should call onCardDataChange when typing in card name", () => {
        render(
            <PaymentForm
                paymentMethod="credit_card"
                onPaymentMethodChange={mockOnPaymentMethodChange}
                cardData={mockCardData}
                onCardDataChange={mockOnCardDataChange}
                errors={{}}
            />,
        );

        const nameField = screen.getByLabelText(/Nome no cartão/i);
        fireEvent.change(nameField, { target: { value: "JOAO SILVA" } });
        expect(mockOnCardDataChange).toHaveBeenCalled();
    });
});
