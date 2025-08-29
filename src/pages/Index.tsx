import { Clock, Users, UserCheck, Timer } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { FiltersBar } from "@/components/FiltersBar";
import { KPICard } from "@/components/KPICard";
import { TimeSeriesPanel } from "@/components/TimeSeriesPanel";
import { GaugeChart } from "@/components/GaugeChart";
import { HourlyDistributionChart } from "@/components/HourlyDistributionChart";
import { AttendantTable } from "@/components/AttendantTable";
import { useDashboardData } from "@/hooks/useDashboardData";

const Index = () => {
  const {
    data,
    kpis,
    filters,
    setFilters,
    uniqueUnidades,
    uniqueAtendentes,
    uniqueTurnos,
    uniqueTipos,
    totalRegistros
  } = useDashboardData();

  // Calculate SLA percentages for gauges
  const slaTriagem = data.length > 0 
    ? (data.filter(d => d.tempoTriagemMin <= 10).length / data.length) * 100 
    : 0;
    
  const slaRegistro = data.length > 0 
    ? (data.filter(d => d.tempoRegistroMin <= 5).length / data.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <FiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        uniqueUnidades={uniqueUnidades}
        uniqueAtendentes={uniqueAtendentes}
        uniqueTurnos={uniqueTurnos}
        uniqueTipos={uniqueTipos}
        totalRegistros={totalRegistros}
      />
      
      <div className="p-6 space-y-8">
        {/* KPIs Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Indicadores Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Aguardando registro (média)"
              data={kpis.aguardandoRegistro}
              icon={<Clock className="h-4 w-4" />}
            />
            <KPICard
              title="Tempo de registro (média)"
              data={kpis.tempoRegistro}
              icon={<Timer className="h-4 w-4" />}
            />
            <KPICard
              title="Aguardando triagem (média)"
              data={kpis.aguardandoTriagem}
              icon={<Users className="h-4 w-4" />}
            />
            <KPICard
              title="Tempo triagem (média)"
              data={kpis.tempoTriagem}
              icon={<UserCheck className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Time Series Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Painel diário</h2>
          <TimeSeriesPanel
            data={data}
            title="Evolução temporal dos indicadores"
          />
        </div>

        {/* Gauges and Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-6">Atendimentos por faixa de horário</h2>
            <HourlyDistributionChart
              data={data}
              title="Distribuição por horário"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">SLA Performance</h2>
              <div className="space-y-4">
                <GaugeChart
                  value={slaTriagem}
                  title="SLA Triagem"
                  subtitle="≤ 10 minutos"
                  size="md"
                />
                <GaugeChart
                  value={slaRegistro}
                  title="SLA Registro"
                  subtitle="≤ 5 minutos"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attendant Table Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Estatística por atendente (período)</h2>
          <AttendantTable
            data={data}
            title="Performance dos atendentes"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
