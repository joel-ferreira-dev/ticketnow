"use client";
import React from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AnimatedSection from "./base/AnimatedSection";

interface HeroProps {
    search: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}


export default function Hero({
    search,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}: HeroProps) {
    return (
        <Box sx={{ mb: 8, mt: 4 }}>
            <AnimatedSection>
                <Typography
                    variant="h1"
                    sx={{
                        mb: 2,
                        fontSize: { xs: "3.5rem", md: "5rem" },
                        lineHeight: 0.9,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        textTransform: "uppercase",
                        background: "linear-gradient(90deg, #000 0%, #666 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block"
                    }}
                >
                    Eventos <br />
                    <Box component="span" sx={{ color: "primary.main", WebkitTextFillColor: "initial" }}>Imersivos</Box>
                </Typography>
            </AnimatedSection>

            <AnimatedSection delay={100}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 5, maxWidth: 450, fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.6 }}
                >
                    A plataforma definitiva para descobrir festivais, shows e experiências que desafiam o comum. Explore o entretenimento do futuro.
                </Typography>
            </AnimatedSection>

            <AnimatedSection delay={200}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ md: "center" }}>
                    <TextField
                        placeholder="Buscar por nome ou local..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        size="medium"
                        label="Buscar Eventos"
                        aria-label="Buscar por nome do evento ou local"
                        sx={{
                            minWidth: { md: 400 },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "1px",
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "primary.main" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat}
                                clickable
                                onClick={() => onCategoryChange(cat)}
                                variant={selectedCategory === cat ? "filled" : "outlined"}
                                color={selectedCategory === cat ? "primary" : "default"}
                                sx={{
                                    borderRadius: "1px",
                                    fontWeight: 700,
                                    px: 1,
                                    height: 38,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </Stack>
            </AnimatedSection>
        </Box>
    );
}
