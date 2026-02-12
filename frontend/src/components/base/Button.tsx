"use client";
import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from "@mui/material";

interface BaseButtonProps extends MuiButtonProps {
    premium?: boolean;
}

const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== "premium",
})<BaseButtonProps>(({ theme, premium }) => ({
    borderRadius: "1px", // Sharp Ticket Geometry
    textTransform: "uppercase",
    fontWeight: 800,
    letterSpacing: "0.05em",
    padding: "10px 24px",
    transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

    ...(premium && {
        background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
        color: "#000",
        border: "none",
        "&:hover": {
            background: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
            transform: "scale(1.02) translateY(-1px)",
            boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
        },
        "&:active": {
            transform: "scale(0.98)",
        }
    }),

    // Ticket notch effect simulation using clip-path (subtle)
    // clipPath: "polygon(0% 10%, 5% 0%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0% 90%)",
}));

/**
 * Premium Button component following the 2025 "Sharp Ticket" aesthetic.
 * Extends MUI Button with custom spring animations and geometry.
 */
export default function Button({ children, ...props }: BaseButtonProps) {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}
