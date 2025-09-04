import { fetchCsv } from './csvClient';
import type { Internacao, TempoAtendimento } from './types';

const toNumber = (v?: string) => {
  if (!v) return null;
  const n = Number(v.toString().replace(',', '.').trim());
  return Number.isFinite(n) ? n : null;
};

const toDate = (v?: string) => {
  if (!v) return null;
  const d = new Date(v.replace(' ', 'T')); // "YYYY-MM-DD HH:mm:ss"
  return isNaN(d.getTime()) ? null : d;
};

const toMinutes = (v?: string) => {
  if (!v) return null;
  const parts = v.split(':').map((x) => Number(x));
  if (parts.some((x) => Number.isNaN(x))) return null;
  if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
  if (parts.length === 2) return parts[0] + parts[1] / 60;
  return null;
};

export async function getInternacoes(): Promise<Internacao[]> {
  const rows = await fetchCsv('/data/ATENDIMENTO_INTERNACAO.csv', { 
    encoding: 'windows-1252', 
    delimiter: ';' 
  });
  
  return rows.map((r) => ({
    ...r,
    PRONTUARIO: r.PRONTUARIO,
    DIAS_INTERNO: toNumber(r.DIAS_INTERNO) ?? undefined,
    DATA_ENTRADA: r.DATA_ENTRADA,
    DATA_SAIDA: r.DATA_SAIDA || null,
    // Campos derivados
    dataEntrada: toDate(r.DATA_ENTRADA),
    dataSaida: toDate(r.DATA_SAIDA),
  })) as Internacao[];
}

export async function getTemposAtendimento(): Promise<TempoAtendimento[]> {
  const rows = await fetchCsv('/data/TEMPO_ATENDIMENTO.csv', { 
    encoding: 'windows-1252', 
    delimiter: ';' 
  });
  
  return rows.map((r) => ({
    ...r,
    // Campos derivados de tempo
    tempoTriagemMin: toMinutes(r.TEMPO_TRIAGEM),
    tempoClinicoMin: toMinutes(r.TEMPO_CLINICO),
    tempoTotalMin: toMinutes(r.TEMPO_TOTAL_ATENDIMENTO),
    dataAtendimento: toDate(r.DATA_ATENDIMENTO),
  })) as TempoAtendimento[];
}