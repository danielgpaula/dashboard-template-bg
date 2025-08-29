import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { AtendimentoData } from '@/types/dashboard';

interface TimeSeriesPanelProps {
  data: AtendimentoData[];
  title: string;
}

export const TimeSeriesPanel = ({ data, title }: TimeSeriesPanelProps) => {
  const [activeSeries, setActiveSeries] = useState({
    aguardandoRegistro: true,
    tempoRegistro: true,
    aguardandoTriagem: true,
    tempoTriagem: true
  });

  // Group data by day and calculate averages
  const groupedData = data.reduce((acc, item) => {
    const date = format(new Date(item.dataHora), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = {
        date,
        aguardandoRegistro: [],
        tempoRegistro: [],
        aguardandoTriagem: [],
        tempoTriagem: []
      };
    }
    acc[date].aguardandoRegistro.push(item.aguardandoRegistroMin);
    acc[date].tempoRegistro.push(item.tempoRegistroMin);
    acc[date].aguardandoTriagem.push(item.aguardandoTriagemMin);
    acc[date].tempoTriagem.push(item.tempoTriagemMin);
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(groupedData).map((group: any) => ({
    date: group.date,
    displayDate: format(new Date(group.date), 'dd/MM', { locale: ptBR }),
    aguardandoRegistro: group.aguardandoRegistro.reduce((a: number, b: number) => a + b, 0) / group.aguardandoRegistro.length,
    tempoRegistro: group.tempoRegistro.reduce((a: number, b: number) => a + b, 0) / group.tempoRegistro.length,
    aguardandoTriagem: group.aguardandoTriagem.reduce((a: number, b: number) => a + b, 0) / group.aguardandoTriagem.length,
    tempoTriagem: group.tempoTriagem.reduce((a: number, b: number) => a + b, 0) / group.tempoTriagem.length
  })).sort((a, b) => a.date.localeCompare(b.date));

  const toggleSeries = (series: keyof typeof activeSeries) => {
    setActiveSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  const series = [
    { key: 'aguardandoRegistro', name: 'Aguardando Registro', color: '#3B82F6', dashArray: '0' },
    { key: 'tempoRegistro', name: 'Tempo Registro', color: '#1E40AF', dashArray: '0' },
    { key: 'aguardandoTriagem', name: 'Aguardando Triagem', color: '#F59E0B', dashArray: '5 5' },
    { key: 'tempoTriagem', name: 'Tempo Triagem', color: '#EF4444', dashArray: '5 5' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex gap-2 flex-wrap">
          {series.map(({ key, name, color }) => (
            <Button
              key={key}
              variant={activeSeries[key as keyof typeof activeSeries] ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSeries(key as keyof typeof activeSeries)}
              className="text-xs"
              style={{
                backgroundColor: activeSeries[key as keyof typeof activeSeries] ? color : 'transparent',
                borderColor: color,
                color: activeSeries[key as keyof typeof activeSeries] ? 'white' : color
              }}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="displayDate"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(2)} min`,
                series.find(s => s.key === name)?.name || name
              ]}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend />
            
            {series.map(({ key, name, color, dashArray }) => (
              activeSeries[key as keyof typeof activeSeries] && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={dashArray}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                  name={name}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};