import { useState, useEffect } from "react";
import {
  Despesa,
  Ganho,
  Meta,
  LimiteCategoria,
  ConfiguracaoSeguranca,
  DadosFinanceiros,
  CategoriaDespesa,
  CategoriaGanho,
  Transacao,
  FiltroExtrato,
} from "../types/financas";
import {
  obterDataBrasilia,
  isMesAtualBrasilia,
  obterMesAtualBrasilia,
  obterAnoAtualBrasilia,
} from "../utils/timezone";

const CHAVE_ARMAZENAMENTO = "gengar-financas-dados";

// Dados iniciais de exemplo
const despesasIniciais: Despesa[] = [
  {
    id: "1",
    valor: 85.5,
    descricao: "Almoço com pimenta fantasma",
    categoria: "alimentacao",
    data: new Date("2024-01-15"),
    criadoEm: new Date("2024-01-15"),
    observacao: "Restaurante perto do trabalho",
  },
  {
    id: "2",
    valor: 45.0,
    descricao: "Uber para casa assombrada",
    categoria: "transporte",
    data: new Date("2024-01-14"),
    criadoEm: new Date("2024-01-14"),
  },
];

const ganhosIniciais: Ganho[] = [
  {
    id: "1",
    valor: 3500.0,
    descricao: "Salário - Caçadores de Fantasmas Ltda",
    categoria: "salario",
    data: new Date("2024-01-01"),
    criadoEm: new Date("2024-01-01"),
  },
  {
    id: "2",
    valor: 500.0,
    descricao: "Freelance - Assombração Premium",
    categoria: "freelance",
    data: new Date("2024-01-10"),
    criadoEm: new Date("2024-01-10"),
  },
];

const metasIniciais: Meta[] = [
  {
    id: "1",
    titulo: "Economizar para casa assombrada",
    valorAlvo: 5000,
    valorAtual: 1200,
    dataInicio: new Date("2024-01-01"),
    dataFim: new Date("2024-12-31"),
    ativa: true,
    criadoEm: new Date("2024-01-01"),
  },
];

const configuracaoSegurancaInicial: ConfiguracaoSeguranca = {
  pinAtivado: false,
};

export function useDadosFinanceiros() {
  const [dados, setDados] = useState<DadosFinanceiros>(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (dadosSalvos) {
      const parsed = JSON.parse(dadosSalvos);
      // Converter strings de data de volta para objetos Date
      parsed.despesas = parsed.despesas.map((d: any) => ({
        ...d,
        data: new Date(d.data),
        criadoEm: new Date(d.criadoEm),
      }));
      parsed.ganhos = parsed.ganhos.map((g: any) => ({
        ...g,
        data: new Date(g.data),
        criadoEm: new Date(g.criadoEm),
      }));
      parsed.metas = (parsed.metas || []).map((m: any) => ({
        ...m,
        dataInicio: new Date(m.dataInicio),
        dataFim: new Date(m.dataFim),
        criadoEm: new Date(m.criadoEm),
      }));
      parsed.limites = (parsed.limites || []).map((l: any) => ({
        ...l,
        criadoEm: new Date(l.criadoEm),
      }));

      // Garantir que configuracaoSeguranca existe
      if (!parsed.configuracaoSeguranca) {
        parsed.configuracaoSeguranca = configuracaoSegurancaInicial;
      }

      return parsed;
    }

    return {
      despesas: despesasIniciais,
      ganhos: ganhosIniciais,
      metas: metasIniciais,
      limites: [],
      configuracaoSeguranca: configuracaoSegurancaInicial,
      capitalBruto: 0,
      totalDespesas: 0,
      capitalLiquido: 0,
      saldoFinal: 0,
    };
  });

  // Calcular totais sempre que os dados mudarem (timezone de Brasília)
  useEffect(() => {
    const ganhosDoMes = dados.ganhos.filter((g) => isMesAtualBrasilia(g.data));
    const despesasDoMes = dados.despesas.filter((d) =>
      isMesAtualBrasilia(d.data),
    );

    const capitalBruto = ganhosDoMes.reduce(
      (sum, ganho) => sum + ganho.valor,
      0,
    );
    const totalDespesas = despesasDoMes.reduce(
      (sum, despesa) => sum + despesa.valor,
      0,
    );
    const capitalLiquido = capitalBruto - totalDespesas;
    const saldoFinal = capitalLiquido;

    setDados((prev) => ({
      ...prev,
      capitalBruto,
      totalDespesas,
      capitalLiquido,
      saldoFinal,
    }));
  }, [dados.ganhos, dados.despesas]);

  // Verificar alertas de limite
  useEffect(() => {
    verificarAlertas();
  }, [dados.despesas, dados.limites]);

  // Salvar no localStorage sempre que os dados mudarem
  useEffect(() => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dados));
  }, [dados]);

  const adicionarDespesa = (despesa: Omit<Despesa, "id" | "criadoEm">) => {
    const novaDespesa: Despesa = {
      ...despesa,
      id: Date.now().toString(),
      criadoEm: obterDataBrasilia(),
    };

    setDados((prev) => ({
      ...prev,
      despesas: [novaDespesa, ...prev.despesas],
    }));
  };

  const adicionarGanho = (ganho: Omit<Ganho, "id" | "criadoEm">) => {
    const novoGanho: Ganho = {
      ...ganho,
      id: Date.now().toString(),
      criadoEm: obterDataBrasilia(),
    };

    setDados((prev) => ({
      ...prev,
      ganhos: [novoGanho, ...prev.ganhos],
    }));
  };

  const adicionarMeta = (meta: Omit<Meta, "id" | "criadoEm">) => {
    const novaMeta: Meta = {
      ...meta,
      id: Date.now().toString(),
      criadoEm: obterDataBrasilia(),
    };

    setDados((prev) => ({
      ...prev,
      metas: [novaMeta, ...prev.metas],
    }));
  };

  const atualizarMeta = (id: string, metaAtualizada: Partial<Meta>) => {
    setDados((prev) => ({
      ...prev,
      metas: prev.metas.map((meta) =>
        meta.id === id ? { ...meta, ...metaAtualizada } : meta,
      ),
    }));
  };

  const adicionarLimiteCategoria = (
    limite: Omit<LimiteCategoria, "id" | "criadoEm">,
  ) => {
    const novoLimite: LimiteCategoria = {
      ...limite,
      id: Date.now().toString(),
      criadoEm: obterDataBrasilia(),
    };

    setDados((prev) => ({
      ...prev,
      limites: [
        ...prev.limites.filter(
          (l) =>
            !(
              l.categoria === limite.categoria &&
              l.mes === limite.mes &&
              l.ano === limite.ano
            ),
        ),
        novoLimite,
      ],
    }));
  };

  const excluirDespesa = (id: string) => {
    setDados((prev) => ({
      ...prev,
      despesas: prev.despesas.filter((d) => d.id !== id),
    }));
  };

  const excluirGanho = (id: string) => {
    setDados((prev) => ({
      ...prev,
      ganhos: prev.ganhos.filter((g) => g.id !== id),
    }));
  };

  const excluirMeta = (id: string) => {
    setDados((prev) => ({
      ...prev,
      metas: prev.metas.filter((m) => m.id !== id),
    }));
  };

  const atualizarConfiguracaoSeguranca = (
    config: Partial<ConfiguracaoSeguranca>,
  ) => {
    setDados((prev) => ({
      ...prev,
      configuracaoSeguranca: { ...prev.configuracaoSeguranca, ...config },
    }));
  };

  const obterTransacoesFiltradas = (filtro: FiltroExtrato): Transacao[] => {
    let dataInicio: Date;
    let dataFim: Date = obterDataBrasilia();

    // Determinar período (usando timezone de Brasília)
    const agora = obterDataBrasilia();
    switch (filtro.periodo) {
      case "7dias":
        dataInicio = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30dias":
        dataInicio = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "personalizado":
        dataInicio = filtro.dataInicio || new Date(0);
        dataFim = filtro.dataFim || agora;
        break;
      default:
        dataInicio = new Date(0);
    }

    // Combinar todas as transações
    const todasTransacoes: Transacao[] = [
      ...dados.despesas.map((despesa) => ({
        id: despesa.id,
        tipo: "despesa" as const,
        valor: despesa.valor,
        descricao: despesa.descricao,
        categoria: despesa.categoria,
        data: despesa.data,
        criadoEm: despesa.criadoEm,
        observacao: despesa.observacao,
        comprovante: despesa.comprovante,
      })),
      ...dados.ganhos.map((ganho) => ({
        id: ganho.id,
        tipo: "ganho" as const,
        valor: ganho.valor,
        descricao: ganho.descricao,
        categoria: ganho.categoria,
        data: ganho.data,
        criadoEm: ganho.criadoEm,
        observacao: ganho.observacao,
        comprovante: ganho.comprovante,
      })),
    ];

    // Aplicar filtros
    return todasTransacoes
      .filter((transacao) => {
        const dataTransacao = new Date(transacao.data);
        return dataTransacao >= dataInicio && dataTransacao <= dataFim;
      })
      .filter((transacao) => {
        if (filtro.tipo && filtro.tipo !== "todos") {
          return transacao.tipo === filtro.tipo;
        }
        return true;
      })
      .filter((transacao) => {
        if (filtro.categoria) {
          return transacao.categoria === filtro.categoria;
        }
        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
      );
  };

  const verificarAlertas = () => {
    const mesAtual = obterMesAtualBrasilia();
    const anoAtual = obterAnoAtualBrasilia();

    dados.limites
      .filter(
        (limite) =>
          limite.ativo && limite.mes === mesAtual && limite.ano === anoAtual,
      )
      .forEach((limite) => {
        const totalGastoCategoria = dados.despesas
          .filter(
            (d) =>
              d.categoria === limite.categoria &&
              d.data.getMonth() === mesAtual &&
              d.data.getFullYear() === anoAtual,
          )
          .reduce((sum, d) => sum + d.valor, 0);

        if (totalGastoCategoria > limite.valorLimite) {
          // Emitir alerta
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("🚨 Limite Ultrapassado!", {
              body: `Você ultrapassou o limite de R$ ${limite.valorLimite} para ${limite.categoria}. Total gasto: R$ ${totalGastoCategoria.toFixed(2)}`,
              icon: "/placeholder.svg",
            });
          }
        }
      });
  };

  const obterDespesasPorCategoria = () => {
    const categoriaTotais: Record<CategoriaDespesa, number> = {
      alimentacao: 0,
      transporte: 0,
      lazer: 0,
      compras: 0,
      contas: 0,
      saude: 0,
      educacao: 0,
      outros: 0,
    };

    dados.despesas
      .filter((d) => isMesAtualBrasilia(d.data))
      .forEach((despesa) => {
        categoriaTotais[despesa.categoria] += despesa.valor;
      });

    return categoriaTotais;
  };

  const obterGanhosPorCategoria = () => {
    const categoriaTotais: Record<CategoriaGanho, number> = {
      salario: 0,
      extra: 0,
      investimentos: 0,
      vendas: 0,
      freelance: 0,
      outros: 0,
    };

    dados.ganhos
      .filter((g) => isMesAtualBrasilia(g.data))
      .forEach((ganho) => {
        categoriaTotais[ganho.categoria] += ganho.valor;
      });

    return categoriaTotais;
  };

  const obterTop3CategoriasDespesas = () => {
    const categorias = obterDespesasPorCategoria();
    return Object.entries(categorias)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .filter(([, valor]) => valor > 0);
  };

  const obterDadosMensais = () => {
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const anoAtual = obterAnoAtualBrasilia();

    return meses.map((mes) => {
      const indiceMes = meses.indexOf(mes);
      const despesasDoMes = dados.despesas
        .filter(
          (d) =>
            d.data.getMonth() === indiceMes &&
            d.data.getFullYear() === anoAtual,
        )
        .reduce((sum, d) => sum + d.valor, 0);

      const ganhosDoMes = dados.ganhos
        .filter(
          (g) =>
            g.data.getMonth() === indiceMes &&
            g.data.getFullYear() === anoAtual,
        )
        .reduce((sum, g) => sum + g.valor, 0);

      return {
        mes,
        despesas: despesasDoMes,
        ganhos: ganhosDoMes,
      };
    });
  };

  const exportarDados = () => {
    const dataBrasilia = obterDataBrasilia();
    const dadosParaExportar = {
      ...dados,
      dataExportacao: dataBrasilia.toISOString(),
      versao: "2.0",
    };

    const blob = new Blob([JSON.stringify(dadosParaExportar, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gengar-financas-${dataBrasilia.toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportarCSV = (transacoes: Transacao[], nomeArquivo: string) => {
    const headers = [
      "Data",
      "Tipo",
      "Descrição",
      "Categoria",
      "Valor",
      "Observação",
    ];
    const linhas = transacoes.map((t) => [
      t.data.toLocaleDateString("pt-BR"),
      t.tipo === "ganho" ? "Entrada" : "Saída",
      t.descricao,
      t.categoria,
      t.valor.toFixed(2),
      t.observacao || "",
    ]);

    const csvContent = [headers, ...linhas]
      .map((linha) => linha.map((campo) => `"${campo}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importarDados = (arquivo: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dadosImportados = JSON.parse(e.target?.result as string);

          if (!dadosImportados.despesas || !dadosImportados.ganhos) {
            throw new Error("Arquivo inválido");
          }

          dadosImportados.despesas = dadosImportados.despesas.map((d: any) => ({
            ...d,
            data: new Date(d.data),
            criadoEm: new Date(d.criadoEm),
          }));

          dadosImportados.ganhos = dadosImportados.ganhos.map((g: any) => ({
            ...g,
            data: new Date(g.data),
            criadoEm: new Date(g.criadoEm),
          }));

          if (dadosImportados.metas) {
            dadosImportados.metas = dadosImportados.metas.map((m: any) => ({
              ...m,
              dataInicio: new Date(m.dataInicio),
              dataFim: new Date(m.dataFim),
              criadoEm: new Date(m.criadoEm),
            }));
          }

          if (dadosImportados.limites) {
            dadosImportados.limites = dadosImportados.limites.map((l: any) => ({
              ...l,
              criadoEm: new Date(l.criadoEm),
            }));
          }

          setDados({
            ...dadosImportados,
            metas: dadosImportados.metas || [],
            limites: dadosImportados.limites || [],
            configuracaoSeguranca:
              dadosImportados.configuracaoSeguranca ||
              configuracaoSegurancaInicial,
          });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(arquivo);
    });
  };

  return {
    dados,
    adicionarDespesa,
    adicionarGanho,
    adicionarMeta,
    atualizarMeta,
    excluirMeta,
    adicionarLimiteCategoria,
    excluirDespesa,
    excluirGanho,
    atualizarConfiguracaoSeguranca,
    obterTransacoesFiltradas,
    obterDespesasPorCategoria,
    obterGanhosPorCategoria,
    obterTop3CategoriasDespesas,
    obterDadosMensais,
    exportarDados,
    exportarCSV,
    importarDados,
  };
}
