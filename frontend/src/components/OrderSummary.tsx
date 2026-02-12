"use client";
import React from "react";
import {
    Box,
    Typography,
    Divider,
    Stack,
    CircularProgress,
    Alert,
} from "@mui/material";
import Button from "./base/Button";
import { CartItem } from "@/types";

interface OrderSummaryProps {
    items: CartItem[];
    totalItems: number;
    formattedTotal: string;
    loading: boolean;
    submitError: string | null;
    onSubmit: () => void;
}

export default function OrderSummary({
    items,
    totalItems,
    formattedTotal,
    loading,
    submitError,
    onSubmit,
}: OrderSummaryProps) {
    return (
        <Box
            sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "1px",
                position: "sticky",
                top: 80,
                bgcolor: "background.paper",
            }}
        >
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                Resumo do Pedido
            </Typography>
            <Stack spacing={1.5} divider={<Divider />}>
                {items.map((item) => (
                    <Box key={item.event.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            <Typography variant="body2" fontWeight={700}>
                                {item.event.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {item.quantity}x{" "}
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.event.price)}
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={800} color="primary.main">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                item.event.price * item.quantity
                            )}
                        </Typography>
                    </Box>
                ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="body1" fontWeight={800}>
                    TOTAL ({totalItems} {totalItems === 1 ? "INGRESSO" : "INGRESSOS"})
                </Typography>
                <Typography variant="h4" fontWeight={900} color="primary.main">
                    {formattedTotal}
                </Typography>
            </Box>

            {submitError && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: "1px" }}>
                    {submitError}
                </Alert>
            )}

            <Button
                premium
                fullWidth
                size="large"
                onClick={onSubmit}
                disabled={loading}
                sx={{
                    py: 2,
                    fontSize: "1.1rem",
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Finalizar Pagamento"}
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 1.5, fontWeight: 600 }}>
                🔒 Pagamento 100% seguro
            </Typography>
        </Box>
    );
}
