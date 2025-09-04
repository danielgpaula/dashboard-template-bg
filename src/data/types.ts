export interface Internacao {
  PRONTUARIO: string;
  NOME_PACIENTE?: string;
  DATA_ENTRADA: string;
  DATA_SAIDA?: string | null;
  DIAS_INTERNO?: number;
  ESPECIALIDADE?: string;
  MEDICO_RESPONSAVEL?: string;
  UNIDADE?: string;
  STATUS?: string;
  // Campos derivados opcionais
  dataEntrada?: Date | null;
  dataSaida?: Date | null;
}

export interface TempoAtendimento {
  PRONTUARIO?: string;
  NOME_PACIENTE?: string;
  DATA_ATENDIMENTO?: string;
  HORA_CHEGADA?: string;
  HORA_TRIAGEM?: string;
  HORA_ATENDIMENTO_MEDICO?: string;
  HORA_ALTA?: string;
  TEMPO_TRIAGEM?: string;
  TEMPO_CLINICO?: string;
  TEMPO_TOTAL_ATENDIMENTO?: string;
  ESPECIALIDADE?: string;
  MEDICO?: string;
  UNIDADE?: string;
  TURNO?: string;
  TIPO_ATENDIMENTO?: string;
  // Campos derivados opcionais
  tempoTriagemMin?: number | null;
  tempoClinicoMin?: number | null;
  tempoTotalMin?: number | null;
  dataAtendimento?: Date | null;
}