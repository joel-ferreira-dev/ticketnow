"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Container,
    Typography,
    Box,
    Paper,
    Chip,
    Divider,
    Alert,
    Snackbar,
    Skeleton,
    Stack,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TicketSelector from "@/components/TicketSelector";
import CheckoutForm from "@/components/CheckoutForm";
import { Event, CreateOrderDto, Order } from "@/types";
import api from "@/lib/api";

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = Number(params.id);

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get<Event>(`/events/${eventId}`);
                setEvent(response.data);
            } catch {
                setError("Evento não encontrado.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (data: CreateOrderDto) => {
        setSubmitting(true);
        setError(null);
        try {
            const response = await api.post<Order>("/orders", data);
            setOrder(response.data);
        } catch {
            setError("Erro ao processar pedido. Tente novamente.");
        } finally {
            setSubmitting(false);
        }
    };

    const formattedDate = event
        ? new Date(event.date).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    const totalPrice = event
        ? new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(event.price * quantity)
        : "";

    const unitPrice = event
        ? new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(event.price)
        : "";

    if (order) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: "secondary.main", mb: 3 }} />
                <Typography variant="h2" gutterBottom>
                    Pedido Confirmado!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Seu pedido #{order.id} foi registrado com sucesso. Enviamos os detalhes para {order.customerEmail}.
                </Typography>
                <Paper sx={{ p: 3, textAlign: "left" }}>
                    <Stack spacing={1.5}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">Evento</Typography>
                            <Typography fontWeight={600}>{event?.title}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">Quantidade</Typography>
                            <Typography fontWeight={600}>{order.quantity}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h5">Total</Typography>
                            <Typography variant="h5" color="primary.main" fontWeight={800}>
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(order.totalPrice)}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <IconButton onClick={() => router.back()} sx={{ mb: 2, color: "text.secondary" }}>
                    <ArrowBackIcon />
                </IconButton>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        {loading ? (
                            <Box>
                                <Skeleton variant="rounded" height={360} animation="wave" sx={{ mb: 3 }} />
                                <Skeleton variant="text" width="60%" height={40} animation="wave" />
                                <Skeleton variant="text" width="100%" animation="wave" />
                                <Skeleton variant="text" width="80%" animation="wave" />
                            </Box>
                        ) : event ? (
                            <Box>
                                <Box
                                    component="img"
                                    src={event.imageUrl}
                                    alt={event.title}
                                    sx={{
                                        width: "100%",
                                        height: 360,
                                        objectFit: "cover",
                                        borderRadius: 3,
                                        mb: 3,
                                    }}
                                />
                                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                    <Chip
                                        label={event.category}
                                        sx={{
                                            bgcolor: "rgba(245, 158, 11, 0.15)",
                                            color: "primary.main",
                                            fontWeight: 700,
                                        }}
                                    />
                                    <Chip
                                        label={`${event.availableTickets} disponíveis`}
                                        variant="outlined"
                                        color={event.availableTickets < 50 ? "error" : "default"}
                                    />
                                </Box>
                                <Typography variant="h2" sx={{ mb: 2 }}>
                                    {event.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                                    {event.description}
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <CalendarTodayIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                        <Typography>{formattedDate}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <LocationOnIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                        <Typography>{event.location}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <PeopleIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                        <Typography>Capacidade: {event.capacity} pessoas</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        ) : null}
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        {loading ? (
                            <Skeleton variant="rounded" height={400} animation="wave" />
                        ) : event ? (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    position: "sticky",
                                    top: 100,
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography variant="h4" sx={{ mb: 3 }}>
                                    Resumo do pedido
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Preço por ingresso
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 800 }}>
                                        {unitPrice}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                        Quantidade
                                    </Typography>
                                    <TicketSelector
                                        quantity={quantity}
                                        max={Math.min(event.availableTickets, 10)}
                                        onChange={setQuantity}
                                    />
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                                    <Typography variant="h5">Total</Typography>
                                    <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 800 }}>
                                        {totalPrice}
                                    </Typography>
                                </Box>
                                <CheckoutForm
                                    eventId={eventId}
                                    onSubmit={handleSubmit}
                                    isLoading={submitting}
                                    quantity={quantity}
                                />
                            </Paper>
                        ) : null}
                    </Grid>
                </Grid>

                <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)} variant="filled">
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}
