import { useState, useMemo } from 'react';
import { AtendimentoData, DashboardFilters, KPIData, KPIConfig, StatusType } from '@/types/dashboard';
import { generateMockData } from '@/utils/mockData';

const defaultConfig: KPIConfig = {
  aguardandoRegistro: { good: 3, warning: 6 },
  tempoRegistro: { good: 5, warning: 10 },
  aguardandoTriagem: { good: 5, warning: 10 },
  tempoTriagem: { good: 8, warning: 15 },
};

export const useDashboardData = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    periodo: {
      inicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      fim: new Date(),
      preset: "7d"
    },
    unidades: [],
    atendentes: [],
    turnos: [],
    tiposAtendimento: []
  });

  const [config] = useState<KPIConfig>(defaultConfig);
  const mockData = useMemo(() => generateMockData(100), []);

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const dataItem = new Date(item.dataHora);
      const dentroPeríodo = dataItem >= filters.periodo.inicio && dataItem <= filters.periodo.fim;
      const dentroUnidades = filters.unidades.length === 0 || filters.unidades.includes(item.unidade);
      const dentroAtendentes = filters.atendentes.length === 0 || filters.atendentes.includes(item.atendente);
      const dentroTurnos = filters.turnos.length === 0 || filters.turnos.includes(item.turno);
      const dentroTipos = filters.tiposAtendimento.length === 0 || filters.tiposAtendimento.includes(item.tipoAtendimento);
      
      return dentroPeríodo && dentroUnidades && dentroAtendentes && dentroTurnos && dentroTipos;
    });
  }, [mockData, filters]);

  const getStatus = (valor: number, thresholds: { good: number; warning: number }): StatusType => {
    if (valor <= thresholds.good) return "success";
    if (valor <= thresholds.warning) return "warning";
    return "critical";
  };

  const calculateKPI = (values: number[], thresholds: { good: number; warning: number }): KPIData => {
    const media = values.reduce((a, b) => a + b, 0) / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const deltaPercentual = Math.random() * 20 - 10; // Mock delta
    
    return {
      valor: media,
      status: getStatus(media, thresholds),
      deltaPercentual,
      p95,
      amostras: values.length
    };
  };

  const kpis = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        aguardandoRegistro: { valor: 0, status: "success" as StatusType, deltaPercentual: 0, p95: 0, amostras: 0 },
        tempoRegistro: { valor: 0, status: "success" as StatusType, deltaPercentual: 0, p95: 0, amostras: 0 },
        aguardandoTriagem: { valor: 0, status: "success" as StatusType, deltaPercentual: 0, p95: 0, amostras: 0 },
        tempoTriagem: { valor: 0, status: "success" as StatusType, deltaPercentual: 0, p95: 0, amostras: 0 }
      };
    }

    return {
      aguardandoRegistro: calculateKPI(
        filteredData.map(d => d.aguardandoRegistroMin),
        config.aguardandoRegistro
      ),
      tempoRegistro: calculateKPI(
        filteredData.map(d => d.tempoRegistroMin),
        config.tempoRegistro
      ),
      aguardandoTriagem: calculateKPI(
        filteredData.map(d => d.aguardandoTriagemMin),
        config.aguardandoTriagem
      ),
      tempoTriagem: calculateKPI(
        filteredData.map(d => d.tempoTriagemMin),
        config.tempoTriagem
      )
    };
  }, [filteredData, config]);

  // Get unique values for filter options
  const uniqueUnidades = [...new Set(mockData.map(d => d.unidade))];
  const uniqueAtendentes = [...new Set(mockData.map(d => d.atendente))];
  const uniqueTurnos = ["Manhã", "Tarde", "Noite"];
  const uniqueTipos = ["Emergência", "Eletivo", "Outros"];

  return {
    data: filteredData,
    kpis,
    filters,
    setFilters,
    uniqueUnidades,
    uniqueAtendentes,
    uniqueTurnos,
    uniqueTipos,
    totalRegistros: filteredData.length
  };
};