import React from "react";
import { Box } from "@mui/material";
import { ExemploCampoValor } from "../components/forms/ExemploCampoValor";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";

export default function TesteCampoValor() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      <NavegacaoPrincipal />
      <ExemploCampoValor />
    </Box>
  );
}
