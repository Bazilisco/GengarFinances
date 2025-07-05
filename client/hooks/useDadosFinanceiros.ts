import { useState, useEffect } from "react";
import {
  Despesa,
  Ganho,
  DadosFinanceiros,
  CategoriaDespesa,
  CategoriaGanho,
} from "../types/financas";

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
      return parsed;
    }

    return {
      despesas: despesasIniciais,
      ganhos: ganhosIniciais,
      capitalBruto: 0,
      totalDespesas: 0,
      capitalLiquido: 0,
      saldoFinal: 0,
    };
  });

  // Calcular totais sempre que os dados mudarem
  useEffect(() => {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const ganhosDoMes = dados.ganhos.filter(
      (g) =>
        g.data.getMonth() === mesAtual && g.data.getFullYear() === anoAtual,
    );
    const despesasDoMes = dados.despesas.filter(
      (d) =>
        d.data.getMonth() === mesAtual && d.data.getFullYear() === anoAtual,
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
    const saldoFinal = capitalLiquido; // Por enquanto igual ao líquido

    setDados((prev) => ({
      ...prev,
      capitalBruto,
      totalDespesas,
      capitalLiquido,
      saldoFinal,
    }));
  }, [dados.ganhos, dados.despesas]);

  // Salvar no localStorage sempre que os dados mudarem
  useEffect(() => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dados));
  }, [dados]);

  const adicionarDespesa = (despesa: Omit<Despesa, "id" | "criadoEm">) => {
    const novaDespesa: Despesa = {
      ...despesa,
      id: Date.now().toString(),
      criadoEm: new Date(),
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
      criadoEm: new Date(),
    };

    setDados((prev) => ({
      ...prev,
      ganhos: [novoGanho, ...prev.ganhos],
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

  const obterDespesasPorCategoria = () => {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

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
      .filter(
        (d) =>
          d.data.getMonth() === mesAtual && d.data.getFullYear() === anoAtual,
      )
      .forEach((despesa) => {
        categoriaTotais[despesa.categoria] += despesa.valor;
      });

    return categoriaTotais;
  };

  const obterGanhosPorCategoria = () => {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const categoriaTotais: Record<CategoriaGanho, number> = {
      salario: 0,
      extra: 0,
      investimentos: 0,
      vendas: 0,
      freelance: 0,
      outros: 0,
    };

    dados.ganhos
      .filter(
        (g) =>
          g.data.getMonth() === mesAtual && g.data.getFullYear() === anoAtual,
      )
      .forEach((ganho) => {
        categoriaTotais[ganho.categoria] += ganho.valor;
      });

    return categoriaTotais;
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
    const anoAtual = new Date().getFullYear();

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
    const dadosParaExportar = {
      ...dados,
      dataExportacao: new Date().toISOString(),
      versao: "1.0",
    };

    const blob = new Blob([JSON.stringify(dadosParaExportar, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gengar-financas-${new Date().toISOString().split("T")[0]}.json`;
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

          // Validar estrutura dos dados
          if (!dadosImportados.despesas || !dadosImportados.ganhos) {
            throw new Error("Arquivo inválido");
          }

          // Converter datas
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

          setDados(dadosImportados);
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
    excluirDespesa,
    excluirGanho,
    obterDespesasPorCategoria,
    obterGanhosPorCategoria,
    obterDadosMensais,
    exportarDados,
    importarDados,
  };
}
