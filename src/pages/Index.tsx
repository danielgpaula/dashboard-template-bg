import DashboardHeader from "@/components/DashboardHeader";
import MetricCard from "@/components/MetricCard";
import TimeChart from "@/components/TimeChart";
import StaffTable from "@/components/StaffTable";
import HourlyChart from "@/components/HourlyChart";

const Index = () => {
  // Sample data for charts
  const registroData = [
    { time: '09:00', value: 2.1 },
    { time: '10:00', value: 2.3 },
    { time: '11:00', value: 2.8 },
    { time: '12:00', value: 2.5 },
    { time: '13:00', value: 2.2 },
    { time: '14:00', value: 2.7 },
    { time: '15:00', value: 3.1 },
    { time: '16:00', value: 2.9 },
  ];

  const trigemData = [
    { time: '09:00', value: 7.2 },
    { time: '10:00', value: 7.8 },
    { time: '11:00', value: 6.9 },
    { time: '12:00', value: 7.5 },
    { time: '13:00', value: 8.1 },
    { time: '14:00', value: 7.3 },
    { time: '15:00', value: 6.8 },
    { time: '16:00', value: 7.6 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="p-6 space-y-6">
        {/* Atendimento Externo Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Atendimento Externo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <MetricCard
              title="Aguardando registro (inicial)"
              value="2,48 min"
              variant="blue"
            />
            <MetricCard
              title="Tempo de registro (inicial)"
              value="7,40 min"
              variant="blue-dark"
            />
            <MetricCard
              title="Aguardando triagem (inicial)"
              value="61,32 min"
              variant="red"
            />
            <MetricCard
              title="Tempo triagem (inicial)"
              value="3,80 min"
              variant="orange"
            />
            <MetricCard
              title="Aguardando atendimento (inicial)"
              value="87,44 min"
              variant="red"
            />
            <MetricCard
              title="Tempo de atendimento (inicial)"
              value="151,80 min"
              variant="red"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TimeChart
              title="Tempo aguardando registro (parciais)"
              data={registroData}
              color="hsl(var(--dashboard-blue))"
            />
            <TimeChart
              title="Tempo de registro (parciais)"
              data={trigemData}
              color="hsl(var(--dashboard-blue-dark))"
            />
          </div>

          {/* Second metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <MetricCard
              title="Aguardando registro (inicial)"
              value="2,29 min"
              variant="blue"
            />
            <MetricCard
              title="Tempo de registro (inicial)"
              value="91,75 min"
              variant="orange"
            />
            <MetricCard
              title="Aguardando triagem (inicial)"
              value="77,21 min"
              variant="red"
            />
            <MetricCard
              title="Tempo triagem (inicial)"
              value="2,75 min"
              variant="orange"
            />
            <MetricCard
              title="Aguardando atendimento (inicial)"
              value="120,41 min"
              variant="red"
            />
            <MetricCard
              title="Tempo de atendimento (inicial)"
              value="241,36 min"
              variant="red"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <StaffTable />
          <HourlyChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
