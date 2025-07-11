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

  // Criar uma nova data ajustada para Brasília (UTC-3)
  const offsetBrasilia = -3 * 60; // UTC-3 em minutos
  const offsetLocal = agora.getTimezoneOffset(); // offset local em minutos
  const diferencaMinutos = offsetBrasilia - offsetLocal;

  return new Date(agora.getTime() + diferencaMinutos * 60000);
}

/**
 * Obtém a data atual formatada para inputs HTML date (YYYY-MM-DD)
 * @returns String no formato YYYY-MM-DD da data atual
 */
export function obterDataAtualFormatada(): string {
  // Método mais simples e confiável
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

/**
 * Formata uma data para input tipo "date" (YYYY-MM-DD)
 * @param data Data para formatar
 * @returns String no formato YYYY-MM-DD
 */
export function formatarDataParaInput(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

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
