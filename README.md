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
- **Top 3 Categorias**: Ranking das categorias que mais consomem dinheiro
- **Metas Ativas**: Visualização rápida do progresso das metas
- **Alertas de Limite**: Notificação quando limites de categoria s��o ultrapassados

#### 2. **Aba "Ganhos"**

- Cadastro de receitas com: valor, data, descrição, categoria, observação e comprovante
- Categorias: Salário, Extra, Investimentos, Vendas, Freelance, Outros
- Listagem completa dos ganhos do mês atual
- Gráficos de distribuição por categoria
- Resumo visual com chips coloridos
- **Anexo de comprovantes**: Upload de imagens (notas fiscais, recibos)

#### 3. **Aba "Despesas"**

- Registro de gastos com: valor, data, categoria, descrição, observação e comprovante
- Categorias: Alimentação, Transporte, Lazer, Compras, Contas, Saúde, Educação, Outros
- Visualização por lista com ícones temáticos
- Filtros automáticos por mês
- Cores diferenciadas para cada categoria
- **Anexo de comprovantes**: Upload de imagens para comprovação de gastos

#### 4. **🔄 Extrato de Transações**

- **Filtros avançados**: Por período (7 dias, 30 dias, personalizado), tipo (entrada/saída), categoria
- **Lista unificada**: Todas as transações em ordem cronológica
- **Resumo do período**: Total de entradas, saídas e saldo
- **Detalhes expandidos**: Visualização de observações e comprovantes
- **Exportação CSV**: Download do extrato para análise externa

#### 5. **🎯 Sistema de Metas**

- **Criação de metas**: Definir objetivos financeiros com valor alvo e prazo
- **Acompanhamento visual**: Barras de progresso para cada meta
- **Atualização manual**: Inserir progresso atual da meta
- **Status de conclusão**: Identificação visual de metas concluídas
- **Metas ativas/inativas**: Controle de quais metas estão sendo acompanhadas

#### 6. **🚨 Sistema de Alertas**

- **Limites por categoria**: Definir valor máximo mensal para cada categoria
- **Notificações automáticas**: Alertas quando limites são ultrapassados
- **Alertas visuais**: Indicadores no dashboard para limites excedidos
- **Configuração flexível**: Limites específicos por mês e ano

#### 7. **⚙️ Configurações e Segurança**

- **PIN de 4 dígitos**: Proteção opcional para acesso ao aplicativo
- **Teste de notificações**: Verificar se as notificações estão funcionando
- **Gerenciamento de limites**: Criar, editar e visualizar limites de categoria
- **Status visual**: Indicadores de progresso para cada limite configurado

#### 8. **📁 Funcionalidade Offline Completa**

- **Armazenamento local**: Todos os dados salvos no `localStorage`
- **Exportar dados**: Download em formato JSON para backup completo
- **Exportar CSV**: Download de extratos para análise em planilhas
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
│   ��   └── LoadingScreen.tsx
│   ├── navegacao/          # Sistema de navegação
│   │   └── NavegacaoPrincipal.tsx
│   └── tema/               # Tema customizado Material UI
│       └── TemaGengarProvider.tsx
├── hooks/                  # Hooks customizados
│   └── useDadosFinanceiros.ts
├── pages/                  # Páginas principais
│   ├── Index.tsx          # Dashboard principal
│   ├── Ganhos.tsx         # Gestão de receitas
│   ├── Despesas.tsx       # Gestão de gastos
│   ├── Extrato.tsx        # Extrato detalhado com filtros
│   ├── Metas.tsx          # Sistema de metas financeiras
│   ├── Configuracoes.tsx  # Configurações e segurança
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
  observacao?: string;
  comprovante?: string; // Base64 da imagem
}

interface Despesa {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaDespesa;
  data: Date;
  criadoEm: Date;
  observacao?: string;
  comprovante?: string; // Base64 da imagem
}

interface Meta {
  id: string;
  titulo: string;
  valorAlvo: number;
  valorAtual: number;
  dataInicio: Date;
  dataFim: Date;
  ativa: boolean;
  criadoEm: Date;
}

interface LimiteCategoria {
  id: string;
  categoria: CategoriaDespesa;
  valorLimite: number;
  ativo: boolean;
  mes: number;
  ano: number;
  criadoEm: Date;
}

interface ConfiguracaoSeguranca {
  pinAtivado: boolean;
  pin?: string;
}
```

### 🎯 Funcionalidades Avançadas Implementadas

- **Extrato completo**: Filtros por período, tipo e categoria com exportação CSV
- **Sistema de metas**: Criação, acompanhamento e gestão de objetivos financeiros
- **Alertas inteligentes**: Limites de gastos por categoria com notificações automáticas
- **Segurança**: PIN de 4 dígitos para proteção de acesso
- **Comprovantes**: Anexo de imagens para transações (notas fiscais, recibos)
- **Dashboard inteligente**: Top 3 categorias, progresso de metas e alertas visuais
- **Exportação avançada**: JSON completo e CSV para extratos específicos
- **Notificações nativas**: Alertas do navegador para limites ultrapassados
- **Interface adaptativa**: Indicadores visuais para diferentes estados das metas
- **Navegaç��o intuitiva**: 6 seções principais com indicadores visuais
- **Responsividade completa**: Otimizado para todos os tamanhos de tela
- **Tema consistente**: Cores e animações do Gengar em toda a interface
- **Partículas fantasma**: Efeitos visuais flutuantes no background

### 🔮 Funcionalidades Futuras

- **Relatórios detalhados**: Análises mensais e anuais com insights
- **Gráficos de tendências**: Previsões baseadas em histórico
- **Backup em nuvem**: Sincronização entre dispositivos
- **Categorias personalizadas**: Criação de categorias específicas do usuário
- **Lembretes automáticos**: Notificações para metas e prazos
- **Exportação PDF**: Relatórios formatados para impressão
- **Modo família**: Controle de gastos compartilhado
- **Integração bancária**: Importação automática de extratos (futuro)

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
