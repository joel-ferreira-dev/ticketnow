"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    Box,
    Chip,
    Stack,
    Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import { Event } from "@/types";
import api from "@/lib/api";

const CATEGORIES = ["Todos", "Show", "Festival", "Teatro", "Stand-up", "Esporte"];

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get<Event[]>("/events");
                setEvents(response.data);
            } catch {
                setError("Não foi possível carregar os eventos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.location.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                selectedCategory === "Todos" || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [events, search, selectedCategory]);

    return (
        <Box sx={{ minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                <Hero
                    search={search}
                    onSearchChange={setSearch}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={CATEGORIES}
                />

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <EventCardSkeleton />
                            </Grid>
                        ))
                        : filteredEvents.map((event) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                                <EventCard event={event} />
                            </Grid>
                        ))}
                    {!loading && filteredEvents.length === 0 && !error && (
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ textAlign: "center", py: 8 }}>
                                <Typography variant="h4" color="text.secondary">
                                    Nenhum evento encontrado
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Tente ajustar sua busca ou filtros.
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
