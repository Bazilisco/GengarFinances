import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TemaGengarProvider } from "./components/tema/TemaGengarProvider";
import Index from "./pages/Index";
import Ganhos from "./pages/Ganhos";
import Despesas from "./pages/Despesas";
import Extrato from "./pages/Extrato";
import Metas from "./pages/Metas";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TemaGengarProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ganhos" element={<Ganhos />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/extrato" element={<Extrato />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TemaGengarProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
