"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Paper,
    Stack,
    Divider,
} from "@mui/material";
import PixIcon from "@mui/icons-material/QrCode2";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { PaymentMethod, CardData } from "@/types";

interface PaymentFormProps {
    paymentMethod: PaymentMethod;
    onPaymentMethodChange: (method: PaymentMethod) => void;
    cardData: CardData;
    onCardDataChange: (data: CardData) => void;
    errors: Record<string, string>;
}

function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}

export default function PaymentForm({
    paymentMethod,
    onPaymentMethodChange,
    cardData,
    onCardDataChange,
    errors,
}: PaymentFormProps) {
    const [pixCopied, setPixCopied] = useState(false);

    const PIX_CODE = "00020126580014br.gov.bcb.pix0136ticketnow-mock-pix-code-12345678905204000053039865802BR5925TICKETNOW LTDA6009SAO PAULO62070503***6304ABCD";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(PIX_CODE);
        setPixCopied(true);
        setTimeout(() => setPixCopied(false), 3000);
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
                Forma de Pagamento
            </Typography>
            <RadioGroup
                value={paymentMethod}
                onChange={(e) => onPaymentMethodChange(e.target.value as PaymentMethod)}
            >
                <Stack spacing={1.5}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            border: "2px solid",
                            borderColor: paymentMethod === "pix" ? "primary.main" : "divider",
                            cursor: "pointer",
                            transition: "border-color 0.15s ease",
                        }}
                        onClick={() => onPaymentMethodChange("pix")}
                    >
                        <FormControlLabel
                            value="pix"
                            control={<Radio />}
                            label={
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <PixIcon sx={{ color: "primary.main" }} />
                                    <Box>
                                        <Typography fontWeight={700}>Pix</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Aprovação instantânea • Sem taxas
                                        </Typography>
                                    </Box>
                                </Stack>
                            }
                            sx={{ m: 0 }}
                        />
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            border: "2px solid",
                            borderColor: paymentMethod === "credit_card" ? "primary.main" : "divider",
                            cursor: "pointer",
                            transition: "border-color 0.15s ease",
                        }}
                        onClick={() => onPaymentMethodChange("credit_card")}
                    >
                        <FormControlLabel
                            value="credit_card"
                            control={<Radio />}
                            label={
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CreditCardIcon sx={{ color: "primary.main" }} />
                                    <Box>
                                        <Typography fontWeight={700}>Cartão de Crédito</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Parcele em até 3x sem juros
                                        </Typography>
                                    </Box>
                                </Stack>
                            }
                            sx={{ m: 0 }}
                        />
                    </Paper>
                </Stack>
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            {paymentMethod === "pix" && (
                <Box sx={{ textAlign: "center" }}>
                    <Box
                        sx={{
                            width: 200,
                            height: 200,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <PixIcon sx={{ fontSize: 120, color: "#000" }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        Escaneie o QR Code ou copie o código abaixo
                    </Typography>
                    <Paper
                        elevation={0}
                        onClick={handleCopy}
                        sx={{
                            p: 1.5,
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px dashed",
                            borderColor: "divider",
                            cursor: "pointer",
                            "&:hover": { borderColor: "primary.main" },
                            transition: "border-color 0.15s ease",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                wordBreak: "break-all",
                                fontFamily: "monospace",
                                display: "block",
                                mb: 0.5,
                            }}
                        >
                            {PIX_CODE.slice(0, 60)}...
                        </Typography>
                        <Typography variant="caption" color="primary.main" fontWeight={700}>
                            {pixCopied ? "✓ Copiado!" : "Clique para copiar"}
                        </Typography>
                    </Paper>
                </Box>
            )}

            {paymentMethod === "credit_card" && (
                <Stack spacing={2}>
                    <TextField
                        label="Número do Cartão"
                        value={cardData.number}
                        onChange={(e) => onCardDataChange({ ...cardData, number: formatCardNumber(e.target.value) })}
                        placeholder="0000 0000 0000 0000"
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        fullWidth
                        inputProps={{ maxLength: 19 }}
                    />
                    <TextField
                        label="Nome no Cartão"
                        value={cardData.name}
                        onChange={(e) => onCardDataChange({ ...cardData, name: e.target.value.toUpperCase() })}
                        placeholder="NOME COMO NO CARTÃO"
                        error={!!errors.cardName}
                        helperText={errors.cardName}
                        fullWidth
                    />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Validade"
                            value={cardData.expiry}
                            onChange={(e) => onCardDataChange({ ...cardData, expiry: formatExpiry(e.target.value) })}
                            placeholder="MM/AA"
                            error={!!errors.cardExpiry}
                            helperText={errors.cardExpiry}
                            fullWidth
                            inputProps={{ maxLength: 5 }}
                        />
                        <TextField
                            label="CVV"
                            value={cardData.cvv}
                            onChange={(e) => onCardDataChange({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                            placeholder="123"
                            error={!!errors.cardCvv}
                            helperText={errors.cardCvv}
                            fullWidth
                            inputProps={{ maxLength: 4 }}
                        />
                    </Stack>
                </Stack>
            )}
        </Box>
    );
}
