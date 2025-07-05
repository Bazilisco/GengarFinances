import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import Index from "./pages/Index";
import Ganhos from "./pages/Ganhos";
import Despesas from "./pages/Despesas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Tema customizado do Gengar
const temaGengar = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#9654FF",
        light: "#B589FF",
        dark: "#7C2AFF",
      },
      secondary: {
        main: "#D1B8FF",
        light: "#E7D9FF",
        dark: "#B589FF",
      },
      background: {
        default: "#0a0a0a",
        paper: "rgba(150, 84, 255, 0.05)",
      },
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.7)",
      },
      success: {
        main: "#4CAF50",
      },
      error: {
        main: "#F44336",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
          },
        },
      },
    },
  },
  ptBR,
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={temaGengar}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ganhos" element={<Ganhos />} />
            <Route path="/despesas" element={<Despesas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
