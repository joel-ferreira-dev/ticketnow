import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TicketSelector from "@/components/TicketSelector";

describe("TicketSelector", () => {
    const defaultProps = {
        quantity: 1,
        max: 10,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        defaultProps.onChange.mockClear();
    });

    it("renders current quantity", () => {
        render(<TicketSelector {...defaultProps} quantity={3} />);
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("calls onChange with incremented value", () => {
        render(<TicketSelector {...defaultProps} quantity={2} />);
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]);
        expect(defaultProps.onChange).toHaveBeenCalledWith(3);
    });

    it("calls onChange with decremented value", () => {
        render(<TicketSelector {...defaultProps} quantity={3} />);
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(defaultProps.onChange).toHaveBeenCalledWith(2);
    });

    it("disables decrement at minimum", () => {
        render(<TicketSelector {...defaultProps} quantity={1} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons[0]).toBeDisabled();
    });

    it("disables increment at maximum", () => {
        render(<TicketSelector {...defaultProps} quantity={10} max={10} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons[1]).toBeDisabled();
    });
});
