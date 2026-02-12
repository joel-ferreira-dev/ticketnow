import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CartItem as CartItemType } from "@/types";

interface CartItemComponentProps {
    item: CartItemType;
    onUpdateQuantity: (eventId: number, quantity: number) => void;
    onRemove: (eventId: number) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemComponentProps) {
    const { event, quantity } = item;

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(event.price * quantity);

    const unitPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(event.price);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid",
                borderColor: "divider",
                transition: "background 0.15s ease",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
            }}
        >
            <Box
                component="img"
                src={event.imageUrl}
                alt={event.title}
                sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 1.5,
                    flexShrink: 0,
                }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="body2"
                    fontWeight={700}
                    noWrap
                    sx={{ mb: 0.25 }}
                >
                    {event.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {unitPrice} / ingresso
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(event.id, quantity - 1)}
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
                        onClick={() => onUpdateQuantity(event.id, quantity + 1)}
                        disabled={quantity >= event.availableTickets}
                        sx={{ border: "1px solid", borderColor: "divider", width: 28, height: 28 }}
                    >
                        <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Stack>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                <IconButton
                    size="small"
                    onClick={() => onRemove(event.id)}
                    sx={{ color: "error.main", opacity: 0.7, "&:hover": { opacity: 1 } }}
                >
                    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography variant="body2" fontWeight={800} color="primary.main">
                    {formattedPrice}
                </Typography>
            </Box>
        </Box>
    );
}
