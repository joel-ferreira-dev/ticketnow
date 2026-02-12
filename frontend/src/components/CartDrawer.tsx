"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Drawer,
    Box,
    Typography,
    Button,
    Divider,
    Stack,
    IconButton,
    Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import CartItemComponent from "@/components/CartItem";
import { useCart } from "@/hooks/useCart";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const router = useRouter();
    const { items, expiresAt, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!expiresAt) {
            setTimeLeft("");
            return;
        }

        const update = () => {
            const diff = expiresAt - Date.now();
            if (diff <= 0) {
                setTimeLeft("Expirado");
                clearCart();
                return;
            }
            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [expiresAt, clearCart]);

    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(totalPrice);

    const handleCheckout = () => {
        onClose();
        router.push("/checkout");
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 420 },
                    bgcolor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <ShoppingCartOutlinedIcon sx={{ color: "primary.main" }} />
                    <Typography variant="h5" fontWeight={800}>
                        Carrinho
                    </Typography>
                    {totalItems > 0 && (
                        <Chip label={`${totalItems}`} size="small" color="primary" sx={{ fontWeight: 700, height: 24 }} />
                    )}
                </Stack>
                <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider />

            {expiresAt && timeLeft && (
                <Box sx={{ px: 2.5, py: 1.5, bgcolor: timeLeft === "Expirado" ? "error.dark" : "rgba(245,158,11,0.08)" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TimerIcon sx={{ fontSize: 18, color: timeLeft === "Expirado" ? "error.light" : "primary.main" }} />
                        <Typography variant="body2" color={timeLeft === "Expirado" ? "error.light" : "primary.main"} fontWeight={600}>
                            {timeLeft === "Expirado" ? "Reserva expirada" : `Reserva expira em ${timeLeft}`}
                        </Typography>
                    </Stack>
                </Box>
            )}

            <Box sx={{ flex: 1, overflow: "auto", p: 2.5 }}>
                {items.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: "text.secondary", opacity: 0.3, mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Seu carrinho está vazio
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Adicione ingressos dos eventos disponíveis.
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={1.5}>
                        {items.map((item) => (
                            <CartItemComponent
                                key={item.event.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </Stack>
                )}
            </Box>

            {items.length > 0 && (
                <Box sx={{ p: 2.5, borderTop: "1px solid", borderColor: "divider" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Subtotal ({totalItems} {totalItems === 1 ? "ingresso" : "ingressos"})
                        </Typography>
                        <Typography variant="h5" fontWeight={800} color="primary.main">
                            {formattedTotal}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleCheckout}
                        sx={{ mb: 1, py: 1.5, fontWeight: 800, fontSize: "1rem" }}
                    >
                        Finalizar Compra
                    </Button>
                    <Button
                        variant="text"
                        fullWidth
                        size="small"
                        onClick={clearCart}
                        sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                    >
                        Limpar carrinho
                    </Button>
                </Box>
            )}
        </Drawer>
    );
}
