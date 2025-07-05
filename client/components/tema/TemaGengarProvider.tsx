import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ptBR } from "@mui/material/locale";

interface TemaGengarProviderProps {
  children: ReactNode;
}

// Tema customizado do Gengar
const temaGengar = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#9654FF",
        light: "#B589FF",
        dark: "#7C2AFF",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#D1B8FF",
        light: "#E7D9FF",
        dark: "#B589FF",
        contrastText: "#000000",
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
        contrastText: "#ffffff",
      },
      error: {
        main: "#F44336",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#FF9800",
        contrastText: "#ffffff",
      },
      info: {
        main: "#2196F3",
        contrastText: "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        color: "#ffffff",
      },
      h2: {
        fontWeight: 700,
        color: "#ffffff",
      },
      h3: {
        fontWeight: 700,
        color: "#ffffff",
      },
      h4: {
        fontWeight: 700,
        color: "#ffffff",
      },
      h5: {
        fontWeight: 600,
        color: "#ffffff",
      },
      h6: {
        fontWeight: 600,
        color: "#ffffff",
      },
      body1: {
        color: "#ffffff",
      },
      body2: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: "#0a0a0a",
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(150, 84, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(150, 84, 255, 0.05) 0%, transparent 50%)
            `,
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "rgba(150, 84, 255, 0.4)",
              boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          contained: {
            boxShadow: "0 4px 12px rgba(150, 84, 255, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(150, 84, 255, 0.4)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(150, 84, 255, 0.3)",
                transition: "border-color 0.2s ease",
              },
              "&:hover fieldset": {
                borderColor: "rgba(150, 84, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9654FF",
                borderWidth: "2px",
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(150, 84, 255, 0.3)",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: 4,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateX(4px)",
              backgroundColor: "rgba(150, 84, 255, 0.1)",
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 12,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          bar: {
            borderRadius: 8,
          },
        },
      },
    },
  },
  ptBR,
);

export function TemaGengarProvider({ children }: TemaGengarProviderProps) {
  return (
    <ThemeProvider theme={temaGengar}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
