import React, { useState, useEffect } from "react";
import { Box, Typography, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CampoValorGengarProps {
  label?: string;
  value?: number; // valor em centavos
  onChange?: (valorEmCentavos: number) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

// Campo estilizado com tema Gengar
const StyledInput = styled("input")<{ error?: boolean }>(
  ({ theme, error }) => ({
    width: "100%",
    padding: "16px 20px",
    fontSize: "1.2rem",
    fontWeight: "600",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    color: "#E1BEE7",
    backgroundColor: "#0e0e0e",
    border: `2px solid ${error ? "#FF6B6B" : "#9654FF"}`,
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `0 0 0 0 ${error ? "#FF6B6B" : "#9654FF"}20`,

    "&::placeholder": {
      color: "#666666",
      fontWeight: "400",
    },

    "&:focus": {
      borderColor: error ? "#FF6B6B" : "#B589FF",
      boxShadow: `0 0 0 4px ${error ? "#FF6B6B" : "#9654FF"}30`,
      backgroundColor: "#1a1a1a",
      transform: "translateY(-1px)",
    },

    "&:hover:not(:focus)": {
      borderColor: error ? "#FF6B6B" : "#7C2AFF",
      backgroundColor: "#151515",
    },

    "&:disabled": {
      backgroundColor: "#0a0a0a",
      borderColor: "#333333",
      color: "#666666",
      cursor: "not-allowed",
    },

    // Animação de glow neon
    "&:focus::before": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: `linear-gradient(45deg, ${error ? "#FF6B6B" : "#9654FF"}, ${error ? "#FF8A80" : "#B589FF"}, ${error ? "#FF6B6B" : "#7C2AFF"})`,
      borderRadius: "12px",
      zIndex: -1,
      filter: "blur(6px)",
      opacity: 0.7,
    },

    // Responsividade
    "@media (max-width: 768px)": {
      padding: "14px 16px",
      fontSize: "1.1rem",
    },

    "@media (max-width: 480px)": {
      padding: "12px 14px",
      fontSize: "1rem",
    },
  }),
);

const FieldContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #9654FF10, #7C2AFF05)",
    borderRadius: "12px",
    zIndex: -2,
  },
}));

const StatusText = styled(Typography)<{ error?: boolean }>(({ error }) => ({
  marginTop: "8px",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: error ? "#FF6B6B" : "#B589FF",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textShadow: `0 0 8px ${error ? "#FF6B6B" : "#B589FF"}40`,

  "&::before": {
    content: '"💰"',
    fontSize: "1rem",
  },

  "@media (max-width: 480px)": {
    fontSize: "0.8rem",
  },
}));

const Label = styled(Typography)(() => ({
  marginBottom: "8px",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#E1BEE7",
  textShadow: "0 0 10px #9654FF40",

  "@media (max-width: 480px)": {
    fontSize: "0.9rem",
  },
}));

export const CampoValorGengar: React.FC<CampoValorGengarProps> = ({
  label = "Valor (R$)",
  value = 0,
  onChange,
  placeholder = "R$ 0,00",
  disabled = false,
  fullWidth = true,
  error = false,
  helperText,
}) => {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Função para formatar valor em centavos para moeda brasileira
  const formatarMoeda = (valorEmCentavos: number): string => {
    const valorEmReais = valorEmCentavos / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valorEmReais);
  };

  // Atualizar display quando o value prop mudar
  useEffect(() => {
    setDisplayValue(formatarMoeda(value));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Remove tudo que não é número
    const apenasNumeros = inputValue.replace(/\D/g, "");

    // Limita a entrada para evitar valores muito grandes
    const numeroLimitado = apenasNumeros.slice(0, 12); // Máximo 12 dígitos

    // Converte para número (em centavos)
    const valorEmCentavos = parseInt(numeroLimitado) || 0;

    // Formata para exibição
    const valorFormatado = formatarMoeda(valorEmCentavos);

    // Atualiza o display
    setDisplayValue(valorFormatado);

    // Chama callback com valor em centavos
    if (onChange) {
      onChange(valorEmCentavos);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Seleciona todo o texto ao focar
    setTimeout(() => {
      const input = document.activeElement as HTMLInputElement;
      if (input) {
        input.select();
      }
    }, 10);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const valorFormatadoStatus = displayValue || "R$ 0,00";

  return (
    <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
      {label && <Label>{label}</Label>}

      <FieldContainer>
        <StyledInput
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Efeito de glow animado quando focado */}
        {isFocused && !disabled && (
          <Box
            sx={{
              position: "absolute",
              top: "-4px",
              left: "-4px",
              right: "-4px",
              bottom: "-4px",
              borderRadius: "16px",
              background: `linear-gradient(45deg, ${error ? "#FF6B6B" : "#9654FF"}40, ${error ? "#FF8A80" : "#B589FF"}40, ${error ? "#FF6B6B" : "#7C2AFF"}40)`,
              filter: "blur(8px)",
              zIndex: -1,
              animation: "gengarGlow 2s ease-in-out infinite alternate",
            }}
          />
        )}
      </FieldContainer>

      {/* Texto de status */}
      <StatusText error={error}>
        Formato atual: {valorFormatadoStatus}
      </StatusText>

      {/* Helper text */}
      {helperText && (
        <Typography
          sx={{
            marginTop: "4px",
            fontSize: "0.75rem",
            color: error ? "#FF6B6B" : "#888888",
          }}
        >
          {helperText}
        </Typography>
      )}

      {/* Estilos globais para animação */}
      <style>
        {`
          @keyframes gengarGlow {
            0% { 
              opacity: 0.6;
              transform: scale(1);
            }
            100% { 
              opacity: 0.8;
              transform: scale(1.02);
            }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default CampoValorGengar;
