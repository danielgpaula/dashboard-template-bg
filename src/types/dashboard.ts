export interface AtendimentoData {
  dataHora: string;
  unidade: string;
  atendente: string;
  turno: "Manhã" | "Tarde" | "Noite";
  tipoAtendimento: "Emergência" | "Eletivo" | "Outros";
  aguardandoRegistroMin: number;
  tempoRegistroMin: number;
  aguardandoTriagemMin: number;
  tempoTriagemMin: number;
}

export interface KPIConfig {
  aguardandoRegistro: { good: number; warning: number };
  tempoRegistro: { good: number; warning: number };
  aguardandoTriagem: { good: number; warning: number };
  tempoTriagem: { good: number; warning: number };
}

export interface DashboardFilters {
  periodo: {
    inicio: Date;
    fim: Date;
    preset?: "hoje" | "7d" | "15d" | "30d" | "customizado";
  };
  unidades: string[];
  atendentes: string[];
  turnos: string[];
  tiposAtendimento: string[];
}

export type StatusType = "success" | "warning" | "critical";

export interface KPIData {
  valor: number;
  status: StatusType;
  deltaPercentual: number;
  p95: number;
  amostras: number;
}