import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "TicketNow — Ingressos para shows, festivais e eventos",
    description: "Compre ingressos para os melhores shows, festivais, teatro e eventos esportivos. Encontre as melhores experiências aqui.",
    keywords: ["ingressos", "shows", "festivais", "teatro", "eventos"],
    openGraph: {
        title: "TicketNow — Ingressos para shows, festivais e eventos",
        description: "Compre ingressos para os melhores shows, festivais, teatro e eventos esportivos.",
        type: "website",
        locale: "pt_BR",
        url: "https://ticketnow.com.br",
        siteName: "TicketNow",
    },
    twitter: {
        card: "summary_large_image",
        title: "TicketNow — Ingressos para shows, festivais e eventos",
        description: "Compre ingressos para os melhores shows, festivais, teatro e eventos esportivos.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className={inter.className} style={{ margin: 0 }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <CartProvider>
                        <Header />
                        {children}
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
