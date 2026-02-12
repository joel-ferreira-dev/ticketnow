"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface TicketSelectorProps {
    quantity: number;
    max: number;
    onChange: (value: number) => void;
}

export default function TicketSelector({ quantity, max, onChange }: TicketSelectorProps) {
    const handleDecrement = () => {
        if (quantity > 1) onChange(quantity - 1);
    };

    const handleIncrement = () => {
        if (quantity < max) onChange(quantity + 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                width: "fit-content",
            }}
        >
            <IconButton
                onClick={handleDecrement}
                disabled={quantity <= 1}
                size="small"
                sx={{
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                    "&:hover": { bgcolor: "rgba(245, 158, 11, 0.2)" },
                    "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.03)" },
                }}
            >
                <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
                variant="h5"
                sx={{ minWidth: 40, textAlign: "center", fontWeight: 700 }}
            >
                {quantity}
            </Typography>
            <IconButton
                onClick={handleIncrement}
                disabled={quantity >= max}
                size="small"
                sx={{
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                    "&:hover": { bgcolor: "rgba(245, 158, 11, 0.2)" },
                    "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.03)" },
                }}
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}
