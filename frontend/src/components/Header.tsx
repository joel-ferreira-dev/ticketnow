"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/hooks/useCart";

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "rgba(18, 18, 18, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
                        onClick={() => (window.location.href = "/")}
                    >
                        <ConfirmationNumberIcon sx={{ color: "primary.main", fontSize: 28 }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            TicketNow
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={() => setCartOpen(true)}
                        sx={{
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
                            transition: "color 0.15s ease",
                        }}
                    >
                        <Badge
                            badgeContent={totalItems}
                            color="primary"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontWeight: 800,
                                    fontSize: "0.7rem",
                                },
                            }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
