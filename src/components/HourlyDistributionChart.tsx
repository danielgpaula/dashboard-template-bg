import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Line, ComposedChart } from 'recharts';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { AtendimentoData } from '@/types/dashboard';

interface HourlyDistributionChartProps {
  data: AtendimentoData[];
  title: string;
}

export const HourlyDistributionChart = ({ data, title }: HourlyDistributionChartProps) => {
  const [viewMode, setViewMode] = useState<'histogram' | 'heatmap'>('histogram');

  // Group data by hour
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const hourData = data.filter(item => {
      const itemHour = new Date(item.dataHora).getHours();
      return itemHour === hour;
    });

    return {
      hour: hour.toString().padStart(2, '0') + ':00',
      atendimentos: hourData.length,
      tempoMedio: hourData.length > 0 
        ? hourData.reduce((sum, item) => sum + item.tempoRegistroMin, 0) / hourData.length 
        : 0
    };
  });

  const maxAtendimentos = Math.max(...hourlyData.map(d => d.atendimentos));
  const mediaAtendimentos = hourlyData.reduce((sum, d) => sum + d.atendimentos, 0) / hourlyData.length;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'histogram' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('histogram')}
          >
            Barras
          </Button>
          <Button
            variant={viewMode === 'heatmap' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('heatmap')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Heatmap
          </Button>
        </div>
      </div>

      {viewMode === 'histogram' ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Atendimentos', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number, name: string) => [
                  name === 'atendimentos' ? `${value} atendimentos` : `${value.toFixed(1)} min`,
                  name === 'atendimentos' ? 'Quantidade' : 'Tempo Médio'
                ]}
                labelFormatter={(label) => `Horário: ${label}`}
              />
              <Bar 
                dataKey="atendimentos" 
                fill="hsl(var(--primary))" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Line 
                type="monotone" 
                dataKey={mediaAtendimentos} 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <div className="grid grid-cols-8 gap-1 max-w-md">
            {hourlyData.map((item, index) => {
              const intensity = item.atendimentos / maxAtendimentos;
              const opacity = Math.max(0.1, intensity);
              
              return (
                <div
                  key={index}
                  className="w-8 h-8 rounded border flex items-center justify-center text-xs font-medium cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${opacity})`,
                    color: intensity > 0.5 ? 'white' : 'hsl(var(--foreground))'
                  }}
                  title={`${item.hour}: ${item.atendimentos} atendimentos`}
                >
                  {index}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-muted-foreground text-center">
        Total: {data.length} atendimentos | Média por hora: {mediaAtendimentos.toFixed(1)} | Pico: {maxAtendimentos} atendimentos
      </div>
    </div>
  );
};