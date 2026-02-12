"use client";
import React from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "./base/Button";
import AnimatedSection from "./base/AnimatedSection";

interface OrderSuccessProps {
    orderId: number | null;
    customerName: string;
    customerEmail: string;
    paymentMethod: string;
    totalAmount: string;
    onBackToHome: () => void;
}

/**
 * Success view organism for the checkout process.
 * Features a high-contrast validation check and clean detail summary.
 */
export default function OrderSuccess({
    orderId,
    customerName,
    customerEmail,
    paymentMethod,
    totalAmount,
    onBackToHome,
}: OrderSuccessProps) {
    return (
        <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="sm">
                <AnimatedSection>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: "center",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "1px",
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                bgcolor: "rgba(34, 197, 94, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 3,
                            }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 48, color: "#22c55e" }} />
                        </Box>
                        <Typography variant="h4" fontWeight={900} sx={{ mb: 1, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                            Pedido <Box component="span" sx={{ color: "primary.main" }}>Confirmado!</Box>
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                            Seus ingressos foram reservados com sucesso.
                        </Typography>
                        <Chip
                            label={`PEDIDO #${orderId}`}
                            sx={{
                                fontWeight: 800,
                                fontSize: "1rem",
                                py: 2,
                                px: 1,
                                borderRadius: "1px",
                                bgcolor: "rgba(245,158,11,0.1)",
                                color: "primary.main",
                                mb: 3,
                            }}
                        />
                        <Divider sx={{ my: 3 }} />
                        <Stack spacing={1.5} sx={{ textAlign: "left", mb: 4 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption" sx={{ textTransform: "uppercase", fontWeight: 700, color: "text.secondary" }}>Comprador</Typography>
                                <Typography variant="body2" fontWeight={700}>{customerName}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption" sx={{ textTransform: "uppercase", fontWeight: 700, color: "text.secondary" }}>E-mail</Typography>
                                <Typography variant="body2" fontWeight={700}>{customerEmail}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption" sx={{ textTransform: "uppercase", fontWeight: 700, color: "text.secondary" }}>Pagamento</Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {paymentMethod === "pix" ? "Pix" : "Cartão de Crédito"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption" sx={{ textTransform: "uppercase", fontWeight: 700, color: "text.secondary" }}>Total</Typography>
                                <Typography variant="body2" fontWeight={900} color="primary.main">
                                    {totalAmount}
                                </Typography>
                            </Box>
                        </Stack>
                        <Button
                            premium
                            fullWidth
                            size="large"
                            onClick={onBackToHome}
                            sx={{ py: 2 }}
                        >
                            Voltar para Eventos
                        </Button>
                    </Paper>
                </AnimatedSection>
            </Container>
        </Box>
    );
}
