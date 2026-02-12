"use client";
import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "./base/Button";
import { Event } from "@/types";
import { useCart } from "@/hooks/useCart";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const { addItem, items } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const formattedDate = new Date(event.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(event.price);

    const isSoldOut = event.availableTickets === 0;
    const inCart = items.find((i) => i.event.id === event.id);
    const maxQty = event.availableTickets - (inCart?.quantity || 0);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (maxQty <= 0) return;
        addItem(event, quantity);
        setQuantity(1);
        setShowSnackbar(true);
    };

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "1px", // Sharp Ticket Geometry
                    opacity: isSoldOut ? 0.6 : 1,
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "rgba(255,255,255,0.05)",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                    "&:hover": isSoldOut
                        ? {}
                        : {
                            transform: "translateY(-8px)",
                            boxShadow: "0 24px 50px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.1)",
                        },
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={event.imageUrl}
                        alt={event.title}
                        sx={{ objectFit: "cover" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "60%",
                            background: "linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 100%)",
                        }}
                    />
                    <Chip
                        label={event.category}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: "rgba(245, 158, 11, 0.9)",
                            color: "#000",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                        }}
                    />
                    {isSoldOut && (
                        <Chip
                            label="Esgotado"
                            size="small"
                            color="error"
                            sx={{ position: "absolute", top: 12, right: 12, fontWeight: 700 }}
                        />
                    )}
                    {inCart && !isSoldOut && (
                        <Chip
                            label={`${inCart.quantity} no carrinho`}
                            size="small"
                            color="primary"
                            sx={{ position: "absolute", top: 12, right: 12, fontWeight: 700 }}
                        />
                    )}
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {event.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {event.description}
                    </Typography>
                    <Stack spacing={0.75}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: "primary.main" }} />
                            <Typography variant="body2" color="text.secondary">
                                {formattedDate}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: "primary.main" }} />
                            <Typography variant="body2" color="text.secondary">
                                {event.location}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 800 }}>
                        {formattedPrice}
                    </Typography>
                    {!isSoldOut && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconButton
                                size="small"
                                onClick={(e) => { e.stopPropagation(); setQuantity((q) => Math.max(1, q - 1)); }}
                                disabled={quantity <= 1}
                                sx={{ border: "1px solid", borderColor: "divider", width: 28, height: 28 }}
                            >
                                <RemoveIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                            <Typography variant="body2" fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>
                                {quantity}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={(e) => { e.stopPropagation(); setQuantity((q) => Math.min(maxQty, q + 1)); }}
                                disabled={quantity >= maxQty}
                                sx={{ border: "1px solid", borderColor: "divider", width: 28, height: 28 }}
                            >
                                <AddIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddShoppingCartIcon sx={{ fontSize: 16 }} />}
                                onClick={handleAdd}
                                disabled={maxQty <= 0}
                                sx={{ minWidth: 100, ml: 0.5 }}
                            >
                                {maxQty <= 0 ? "No cart" : "Adicionar"}
                            </Button>
                        </Stack>
                    )}
                    {isSoldOut && (
                        <Button variant="contained" disabled size="small" sx={{ minWidth: 120 }}>
                            Esgotado
                        </Button>
                    )}
                </CardActions>
            </Card>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setShowSnackbar(false)}
                    sx={{ fontWeight: 600 }}
                >
                    {event.title} adicionado ao carrinho!
                </Alert>
            </Snackbar>
        </>
    );
}
