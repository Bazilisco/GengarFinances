import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { LoadingScreen } from "../components/gengar/LoadingScreen";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import { VisaoGeral } from "../components/dashboard/VisaoGeral";

export default function Index() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Simular carregamento para efeito dramático
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (carregando) {
    return <LoadingScreen message="Invocando seus fantasmas financeiros..." />;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      <NavegacaoPrincipal />

      <main>
        <VisaoGeral />
      </main>

      {/* Partículas fantasma flutuantes de fundo */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "rgba(150, 84, 255, 0.1)",
              borderRadius: "50%",
              animation: "float 4s ease-in-out infinite",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
