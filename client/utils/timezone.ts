/**
 * Utilitário para lidar com datas no timezone de Brasília
 * Funciona offline usando apenas JavaScript nativo
 */

/**
 * Obtém a data atual no timezone de Brasília (UTC-3)
 * @returns Data atual no timezone de Brasília
 */
export function obterDataBrasilia(): Date {
  const agora = new Date();

  // Brasília é UTC-3
  const brasiliaOffset = -3 * 60; // -3 horas em minutos
  const utc = agora.getTime() + agora.getTimezoneOffset() * 60000;
  const brasilia = new Date(utc + brasiliaOffset * 60000);

  return brasilia;
}

/**
 * Formata uma data para input tipo "date" (YYYY-MM-DD) no timezone de Brasília
 * @param data Data para formatar (opcional, usa data atual de Brasília se não fornecida)
 * @returns String no formato YYYY-MM-DD
 */
export function formatarDataParaInput(data?: Date): string {
  const dataParaFormatar = data || obterDataBrasilia();

  const ano = dataParaFormatar.getFullYear();
  const mes = String(dataParaFormatar.getMonth() + 1).padStart(2, "0");
  const dia = String(dataParaFormatar.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

/**
 * Obtém a data atual de Brasília formatada para input (YYYY-MM-DD)
 * @returns String no formato YYYY-MM-DD da data atual de Brasília
 */
export function obterDataAtualFormatada(): string {
  const hoje = new Date();

  // Obtém a data no timezone de Brasília (UTC-3)
  const brasiliaOffset = -3 * 60; // -3 horas em minutos
  const utc = hoje.getTime() + hoje.getTimezoneOffset() * 60000;
  const brasilia = new Date(utc + brasiliaOffset * 60000);

  const ano = brasilia.getFullYear();
  const mes = String(brasilia.getMonth() + 1).padStart(2, "0");
  const dia = String(brasilia.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

/**
 * Verifica se uma data está no mesmo mês/ano que a data atual de Brasília
 * @param data Data para verificar
 * @returns true se for do mesmo mês/ano atual de Brasília
 */
export function isMesAtualBrasilia(data: Date): boolean {
  const dataBrasilia = obterDataBrasilia();
  return (
    data.getMonth() === dataBrasilia.getMonth() &&
    data.getFullYear() === dataBrasilia.getFullYear()
  );
}

/**
 * Obtém o mês atual no timezone de Brasília
 * @returns Número do mês (0-11)
 */
export function obterMesAtualBrasilia(): number {
  return obterDataBrasilia().getMonth();
}

/**
 * Obtém o ano atual no timezone de Brasília
 * @returns Número do ano
 */
export function obterAnoAtualBrasilia(): number {
  return obterDataBrasilia().getFullYear();
}

/**
 * Cria uma nova Date garantindo que seja interpretada corretamente para Brasília
 * @param dataInput String no formato YYYY-MM-DD do input
 * @returns Objeto Date ajustado
 */
export function criarDataDeInput(dataInput: string): Date {
  // Criar data no formato local para evitar problemas de timezone
  const [ano, mes, dia] = dataInput.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}
