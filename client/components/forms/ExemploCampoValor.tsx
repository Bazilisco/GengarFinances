import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { CampoValorGengar } from "./CampoValorGengar";

export const ExemploCampoValor: React.FC = () => {
  const [valor, setValor] = useState(0); // valor em centavos
  const [valorComErro, setValorComErro] = useState(0);

  const handleSubmit = () => {
    console.log("Valor enviado (centavos):", valor);
    console.log("Valor em reais:", valor / 100);
    alert(
      `Valor capturado: R$ ${(valor / 100).toFixed(2)}\nEm centavos: ${valor}`,
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#E1BEE7",
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          textShadow: "0 0 20px #9654FF60",
        }}
      >
        👻 Gengar Finanças - Campo de Valor
      </Typography>

      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Exemplo padrão */}
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#E1BEE7", mb: 2, fontWeight: "600" }}
            >
              🎯 Exemplo Principal
            </Typography>

            <CampoValorGengar
              label="Valor da Despesa"
              value={valor}
              onChange={setValor}
              placeholder="Digite apenas números"
              helperText="Ex: Digite 1234 para R$ 12,34"
            />

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography sx={{ color: "#B589FF", mb: 2 }}>
                💾 Valor capturado: <strong>{valor} centavos</strong> ={" "}
                <strong>R$ {(valor / 100).toFixed(2)}</strong>
              </Typography>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={valor === 0}
                sx={{
                  background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                  },
                  "&:disabled": {
                    background: "#333333",
                    color: "#666666",
                  },
                }}
              >
                Enviar Valor
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Exemplo com erro */}
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 107, 107, 0.05))",
            border: "1px solid rgba(255, 107, 107, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(255, 107, 107, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#FF6B6B", mb: 2, fontWeight: "600" }}
            >
              ⚠️ Exemplo com Erro
            </Typography>

            <CampoValorGengar
              label="Valor Inválido"
              value={valorComErro}
              onChange={setValorComErro}
              error={true}
              helperText="Este campo tem um erro para demonstração"
            />
          </CardContent>
        </Card>

        {/* Exemplo desabilitado */}
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(102, 102, 102, 0.15), rgba(102, 102, 102, 0.05))",
            border: "1px solid rgba(102, 102, 102, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(102, 102, 102, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#888888", mb: 2, fontWeight: "600" }}
            >
              🚫 Exemplo Desabilitado
            </Typography>

            <CampoValorGengar
              label="Campo Bloqueado"
              value={123456} // R$ 1.234,56
              disabled={true}
              helperText="Este campo está desabilitado"
            />
          </CardContent>
        </Card>

        {/* Instruções de uso */}
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.08), rgba(150, 84, 255, 0.03))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#B589FF", mb: 2, fontWeight: "600" }}
            >
              📋 Como Usar
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#E1BEE7", lineHeight: 1.6, mb: 2 }}
            >
              <strong>1. Importação:</strong>
              <br />
              <code
                style={{
                  background: "#1a1a1a",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                import {`{CampoValorGengar}`} from
                './components/forms/CampoValorGengar';
              </code>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#E1BEE7", lineHeight: 1.6, mb: 2 }}
            >
              <strong>2. Estado:</strong>
              <br />
              <code
                style={{
                  background: "#1a1a1a",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                const [valor, setValor] = useState(0); // em centavos
              </code>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#E1BEE7", lineHeight: 1.6 }}
            >
              <strong>3. Uso:</strong>
              <br />
              <code
                style={{
                  background: "#1a1a1a",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {`<CampoValorGengar value={valor} onChange={setValor} />`}
              </code>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ExemploCampoValor;
