import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TrendingUp as GanhosIcon,
  TrendingDown as DespesasIcon,
  Receipt as ExtratoIcon,
  EmojiEvents as MetasIcon,
  Settings as ConfigIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { GengarMascot } from "../gengar/GengarMascot";

const abas = [
  { path: "/", label: "Visão Geral", icon: DashboardIcon },
  { path: "/ganhos", label: "Ganhos", icon: GanhosIcon },
  { path: "/despesas", label: "Despesas", icon: DespesasIcon },
  { path: "/extrato", label: "Extrato", icon: ExtratoIcon },
  { path: "/metas", label: "Metas", icon: MetasIcon },
];

export function NavegacaoPrincipal() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const abaAtual = abas.findIndex((aba) => aba.path === location.pathname);

  const alternarMenuMobile = () => {
    setMenuMobileAberto(!menuMobileAberto);
  };

  const ConteudoMenu = () => (
    <List>
      {abas.map((aba) => {
        const IconeComponente = aba.icon;
        return (
          <ListItem
            key={aba.path}
            component={Link}
            to={aba.path}
            onClick={() => setMenuMobileAberto(false)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(150, 84, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon>
              <IconeComponente sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={aba.label} />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #240675, #3e0baa, #5d0fff)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          {/* Logo e título */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GengarMascot size="sm" animate={false} />
            </motion.div>
            <Box>
              <Typography
                variant="h6"
                component="div"
                color="white"
                fontWeight="bold"
              >
                Gengar Finanças
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.7)">
                Controle fantasmal de dinheiro
              </Typography>
            </Box>
          </Box>

          {/* Navegação desktop */}
          {!isMobile && (
            <Tabs
              value={abaAtual !== -1 ? abaAtual : false}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                "& .MuiTab-root": {
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-selected": {
                    color: "white",
                  },
                },
              }}
            >
              {abas.map((aba) => {
                const IconeComponente = aba.icon;
                return (
                  <Tab
                    key={aba.path}
                    component={Link}
                    to={aba.path}
                    icon={<IconeComponente />}
                    label={aba.label}
                    iconPosition="start"
                  />
                );
              })}
            </Tabs>
          )}

          {/* Menu mobile */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={alternarMenuMobile}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para mobile */}
      <Drawer
        anchor="right"
        open={menuMobileAberto}
        onClose={alternarMenuMobile}
        PaperProps={{
          sx: {
            backgroundColor: "#240675",
            backgroundImage: "linear-gradient(135deg, #240675, #3e0baa)",
          },
        }}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <ConteudoMenu />
        </Box>
      </Drawer>

      {/* Espaçamento para o conteúdo */}
      <Toolbar />
    </>
  );
}
