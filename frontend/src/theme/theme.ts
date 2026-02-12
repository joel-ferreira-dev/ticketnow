"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#F59E0B",
            light: "#FBBF24",
            dark: "#D97706",
            contrastText: "#000000",
        },
        secondary: {
            main: "#10B981",
            light: "#34D399",
            dark: "#059669",
        },
        background: {
            default: "#0F0F0F",
            paper: "#1A1A1A",
        },
        text: {
            primary: "#F5F5F5",
            secondary: "#A3A3A3",
        },
        error: {
            main: "#EF4444",
        },
        divider: "rgba(255, 255, 255, 0.08)",
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
        h1: {
            fontSize: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 700,
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 600,
        },
        h5: {
            fontSize: "1rem",
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "10px 24px",
                    fontSize: "0.95rem",
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(245, 158, 11, 0.12)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;
