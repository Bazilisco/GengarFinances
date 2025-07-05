import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { GengarMascot } from "../components/gengar/GengarMascot";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <GengarMascot size="lg" animate={true} />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: 700,
            background: "linear-gradient(45deg, #9654FF, #D1B8FF)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" color="white" gutterBottom>
          Página Não Encontrada
        </Typography>

        <Typography
          variant="body1"
          color="rgba(255,255,255,0.7)"
          sx={{ mb: 4, maxWidth: 400 }}
        >
          Esta página desapareceu como um fantasma! 👻
          <br />
          Volte para o dashboard para continuar controlando suas finanças.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
            "&:hover": {
              background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
              transform: "translateY(-2px)",
            },
            py: 1.5,
            px: 4,
            borderRadius: 3,
            transition: "all 0.3s ease",
          }}
        >
          Voltar ao Início
        </Button>

        {/* Partículas fantasma */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: "16px",
                height: "16px",
                backgroundColor: "rgba(150, 84, 255, 0.2)",
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
