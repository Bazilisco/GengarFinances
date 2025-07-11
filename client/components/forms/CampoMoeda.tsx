import { useState, useEffect } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface CampoMoedaProps extends Omit<TextFieldProps, "value" | "onChange"> {
  value?: number; // valor em centavos
  onChange?: (valorEmCentavos: number) => void;
  moeda?: "BRL" | "USD" | "EUR";
}

const simbolosMoeda = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
};

const localesMoeda = {
  BRL: "pt-BR",
  USD: "en-US",
  EUR: "de-DE",
};

const currencyMoeda = {
  BRL: "BRL",
  USD: "USD",
  EUR: "EUR",
};

export function CampoMoeda({
  value = 0,
  onChange,
  moeda = "BRL",
  ...textFieldProps
}: CampoMoedaProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Função para formatar valor em centavos para exibição
  const formatarValor = (valorEmCentavos: number): string => {
    const valorEmReais = valorEmCentavos / 100;
    return new Intl.NumberFormat(localesMoeda[moeda], {
      style: "currency",
      currency: currencyMoeda[moeda],
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valorEmReais);
  };

  // Atualizar display quando o value prop mudar
  useEffect(() => {
    setDisplayValue(formatarValor(value));
  }, [value, moeda]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Remove tudo que não é número
    const apenasNumeros = inputValue.replace(/\D/g, "");

    // Converte para número (em centavos)
    const valorEmCentavos = parseInt(apenasNumeros) || 0;

    // Formata para exibição
    const valorFormatado = formatarValor(valorEmCentavos);

    // Atualiza o display
    setDisplayValue(valorFormatado);

    // Chama callback com valor em centavos
    if (onChange) {
      onChange(valorEmCentavos);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Quando o campo recebe foco, seleciona todo o texto
    event.target.select();

    // Chama o onFocus original se existir
    if (textFieldProps.onFocus) {
      textFieldProps.onFocus(event);
    }
  };

  return (
    <TextField
      {...textFieldProps}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={formatarValor(0)}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        ...textFieldProps.inputProps,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "rgba(150, 84, 255, 0.3)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(150, 84, 255, 0.5)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9654FF",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255,255,255,0.7)",
        },
        "& .MuiInputBase-input": {
          fontSize: "1.1rem",
          fontWeight: "500",
        },
        ...textFieldProps.sx,
      }}
    />
  );
}
