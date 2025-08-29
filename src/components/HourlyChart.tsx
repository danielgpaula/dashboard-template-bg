import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const HourlyChart = () => {
  const hourlyData = [
    { hour: '00:00', value: 12 },
    { hour: '01:00', value: 8 },
    { hour: '02:00', value: 5 },
    { hour: '03:00', value: 3 },
    { hour: '04:00', value: 4 },
    { hour: '05:00', value: 7 },
    { hour: '06:00', value: 15 },
    { hour: '07:00', value: 25 },
    { hour: '08:00', value: 45 },
    { hour: '09:00', value: 38 },
    { hour: '10:00', value: 42 },
    { hour: '11:00', value: 35 },
    { hour: '12:00', value: 28 },
    { hour: '13:00', value: 32 },
    { hour: '14:00', value: 41 },
    { hour: '15:00', value: 39 },
    { hour: '16:00', value: 44 },
    { hour: '17:00', value: 38 },
    { hour: '18:00', value: 31 },
    { hour: '19:00', value: 25 },
    { hour: '20:00', value: 18 },
    { hour: '21:00', value: 14 },
    { hour: '22:00', value: 10 },
    { hour: '23:00', value: 8 },
  ];

  return (
    <div className="bg-card rounded-lg p-4 shadow-[--shadow-card]">
      <h3 className="text-sm font-medium text-foreground mb-4">
        Atendimentos por faixa de horários (parciais)
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="hour" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              interval={1}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--dashboard-blue))"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyChart;