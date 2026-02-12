"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Alert,
    CircularProgress,
    Stack,
    Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "@/hooks/useCart";
import CartItemComponent from "@/components/CartItem";
import PaymentForm from "@/components/PaymentForm";
import { PaymentMethod, CardData } from "@/types";
import api from "@/lib/api";
import OrderSuccess from "@/components/OrderSuccess";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
    const [cardData, setCardData] = useState<CardData>({ number: "", name: "", expiry: "", cvv: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [savedTotal, setSavedTotal] = useState(0);

    const displayTotal = orderConfirmed ? savedTotal : totalPrice;
    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(displayTotal);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!customerName.trim()) newErrors.name = "Nome é obrigatório";
        if (!customerEmail.trim()) newErrors.email = "E-mail é obrigatório";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) newErrors.email = "E-mail inválido";

        if (paymentMethod === "credit_card") {
            const digits = cardData.number.replace(/\s/g, "");
            if (digits.length < 16) newErrors.cardNumber = "Número do cartão incompleto";
            if (!cardData.name.trim()) newErrors.cardName = "Nome no cartão é obrigatório";
            if (cardData.expiry.length < 5) newErrors.cardExpiry = "Validade incompleta";
            if (cardData.cvv.length < 3) newErrors.cardCvv = "CVV inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        setSubmitError(null);

        try {
            const response = await api.post("/orders", {
                customerName,
                customerEmail,
                paymentMethod,
                items: items.map((item) => ({
                    eventId: item.event.id,
                    quantity: item.quantity,
                })),
            });
            setOrderId(response.data?.id || Math.floor(Math.random() * 90000) + 10000);
            setSavedTotal(totalPrice);
            setOrderConfirmed(true);
            clearCart();
        } catch {
            setSubmitError("Erro ao processar o pedido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (orderConfirmed) {
        return (
            <OrderSuccess
                orderId={orderId}
                customerName={customerName}
                customerEmail={customerEmail}
                paymentMethod={paymentMethod}
                totalAmount={formattedTotal}
                onBackToHome={() => router.push("/")}
            />
        );
    }

    if (items.length === 0) {
        return (
            <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
                <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                    <ShoppingCartCheckoutIcon sx={{ fontSize: 80, color: "text.secondary", opacity: 0.3, mb: 2 }} />
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                        Carrinho vazio
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Adicione ingressos antes de finalizar a compra.
                    </Typography>
                    <Button variant="contained" onClick={() => router.push("/")} sx={{ py: 1.5, px: 4 }}>
                        Ver Eventos
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push("/")}
                    sx={{ mb: 3, color: "text.secondary" }}
                >
                    Voltar aos eventos
                </Button>

                <Typography variant="h3" fontWeight={800} sx={{ mb: 4 }}>
                    Checkout
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 3 }}>
                            <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
                                Seus Ingressos
                            </Typography>
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
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 3 }}>
                            <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
                                Dados Pessoais
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Nome completo"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    fullWidth
                                />
                                <TextField
                                    label="E-mail"
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    fullWidth
                                />
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
                            <PaymentForm
                                paymentMethod={paymentMethod}
                                onPaymentMethodChange={setPaymentMethod}
                                cardData={cardData}
                                onCardDataChange={setCardData}
                                errors={errors}
                            />
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <OrderSummary
                            items={items}
                            totalItems={totalItems}
                            formattedTotal={formattedTotal}
                            loading={loading}
                            submitError={submitError}
                            onSubmit={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
