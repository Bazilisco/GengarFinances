# 👻 Gengar Finanças - Controle Financeiro Pessoal

Um aplicativo completo de controle financeiro pessoal inspirado no Gengar (Pokémon), desenvolvido com React + Vite e Material UI. O app funciona totalmente offline, salvando dados localmente e permitindo exportação/importação para backup.

## ✨ Características Principais

### 🎨 Visual & Tema

- **Design totalmente escuro** com tons de roxo, lilás e preto
- **Animações suaves** e efeitos de sombra estilo "fantasma"
- **Gengar como mascote** presente no dashboard e tela de carregamento
- **Interface responsiva** para desktop, tablet e mobile
- **Tipografia moderna** compatível com a estética Pokémon/Gengar

### 📊 Funcionalidades

#### 1. **Dashboard (Visão Geral)**

- **Capital Bruto**: Total de ganhos do mês atual
- **Total de Despesas**: Soma de todos os gastos do mês
- **Capital Líquido**: Diferença entre ganhos e despesas (bruto - despesas)
- **Saldo Final**: Valor disponível para gastar livremente
- **Barra de Progresso**: Mostra visualmente quanto já foi gasto do total disponível
- **Gráficos interativos**: Pizza para categorias e barras para evolução mensal

#### 2. **Aba "Ganhos"**

- Cadastro de receitas com: valor, data, descrição e categoria
- Categorias: Salário, Extra, Investimentos, Vendas, Freelance, Outros
- Listagem completa dos ganhos do mês atual
- Gráficos de distribuição por categoria
- Resumo visual com chips coloridos

#### 3. **Aba "Despesas"**

- Registro de gastos com: valor, data, categoria e descrição
- Categorias: Alimentação, Transporte, Lazer, Compras, Contas, Saúde, Educação, Outros
- Visualização por lista com ícones temáticos
- Filtros automáticos por mês
- Cores diferenciadas para cada categoria

#### 4. **Funcionalidade Offline Completa**

- **Armazenamento local**: Todos os dados salvos no `localStorage`
- **Exportar dados**: Download em formato JSON para backup
- **Importar dados**: Upload de arquivo JSON para restaurar dados
- **Funcionamento sem internet**: App totalmente funcional offline
- **Persistência**: Dados mantidos mesmo após fechar e reabrir o navegador

### 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Material UI (MUI) com tema customizado
- **Animações**: Framer Motion para transições suaves
- **Gráficos**: MUI X Charts para visualizações interativas
- **Roteamento**: React Router 6
- **Data**: date-fns para formatação de datas em português
- **Armazenamento**: localStorage para persistência offline
- **Ícones**: Material UI Icons + emojis temáticos

### 🚀 Como Executar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:

   ```bash
   npm run dev
   ```

3. **Build para produção**:

   ```bash
   npm run build
   ```

4. **Servir build de produção**:
   ```bash
   npm start
   ```

### 🏗️ Estrutura do Projeto

```
client/
├── components/
│   ├── dashboard/           # Componentes da visão geral
│   │   ├── VisaoGeral.tsx
│   │   ├── GraficosDashboard.tsx
│   │   └── TransacoesRecentes.tsx
│   ├── gengar/             # Componentes temáticos do Gengar
│   │   ├── GengarMascot.tsx
│   │   └── LoadingScreen.tsx
│   ├── navegacao/          # Sistema de navegação
│   │   └── NavegacaoPrincipal.tsx
│   └── tema/               # Tema customizado Material UI
│       └── TemaGengarProvider.tsx
├── hooks/                  # Hooks customizados
│   └── useDadosFinanceiros.ts
├── pages/                  # Páginas principais
│   ├── Index.tsx          # Dashboard
│   ├── Ganhos.tsx         # Gestão de receitas
│   ├── Despesas.tsx       # Gestão de gastos
│   └── NotFound.tsx       # Página 404
├── types/                  # Definições TypeScript
│   └── financas.ts
└── global.css             # Estilos globais
```

### 💾 Estrutura de Dados

```typescript
interface Ganho {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaGanho;
  data: Date;
  criadoEm: Date;
}

interface Despesa {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaDespesa;
  data: Date;
  criadoEm: Date;
}
```

### 🎯 Funcionalidades Extras

- **Alertas visuais** (toasts) para ações como salvar, excluir, importar/exportar
- **Tela de carregamento** com animação do Gengar
- **Navegação intuitiva** entre abas com indicadores visuais
- **Responsividade completa** para todos os tamanhos de tela
- **Tema consistente** com cores e animações do Gengar
- **Partículas fantasma** flutuantes no background
- **Base preparada** para futuras funcionalidades como exportação CSV/PDF

### 🔮 Próximas Funcionalidades

- Relatórios mensais e anuais detalhados
- Metas de gastos por categoria
- Exportação para CSV e PDF
- Gráficos de tendências
- Notificações de lembretes
- Backup em nuvem
- Categorias personalizadas

### 🎮 Sobre o Tema Gengar

O Gengar é um Pokémon do tipo Fantasma conhecido por sua personalidade travessa e sua aparência roxa icônica. O tema do aplicativo captura essa essência através de:

- **Cores roxas e lilás** dominantes
- **Animações "fantasmáticas"** e flutuantes
- **Ícones temáticos** relacionados ao universo sombrio
- **Efeitos de sombra** e brilho característicos
- **Mascote animado** que reage às interações do usuário

---

**Desenvolvido com 💜 usando React + Material UI**

_"Controle suas finanças com o poder fantasmal do Gengar!"_ 👻💰
