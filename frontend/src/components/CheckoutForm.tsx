"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { CreateOrderDto } from "@/types";

interface CheckoutFormProps {
    eventId: number;
    onSubmit: (data: CreateOrderDto) => Promise<void>;
    isLoading: boolean;
    quantity: number;
}

export default function CheckoutForm({
    eventId,
    onSubmit,
    isLoading,
    quantity,
}: CheckoutFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validate = (): boolean => {
        const newErrors: { name?: string; email?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Nome é obrigatório";
        }

        if (!email.trim()) {
            newErrors.email = "E-mail é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "E-mail inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        await onSubmit({
            eventId,
            customerName: name.trim(),
            customerEmail: email.trim(),
            quantity,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
                label="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
                disabled={isLoading}
            />
            <TextField
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
                disabled={isLoading}
            />
            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 1, py: 1.5 }}
            >
                {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    "Finalizar Compra"
                )}
            </Button>
        </Box>
    );
}
