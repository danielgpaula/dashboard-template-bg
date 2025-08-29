import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number; // 0-100
  title: string;
  subtitle: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GaugeChart = ({ value, title, subtitle, size = "md", className }: GaugeChartProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  
  // Create data for semi-circle gauge
  const data = [
    { name: 'progress', value: clampedValue, fill: getProgressColor(clampedValue) },
    { name: 'remaining', value: 100 - clampedValue, fill: 'hsl(var(--muted))' }
  ];

  function getProgressColor(val: number) {
    if (val >= 85) return 'hsl(var(--status-success))';
    if (val >= 70) return 'hsl(var(--status-warning))';
    return 'hsl(var(--status-critical))';
  }

  const sizes = {
    sm: { container: "h-24", text: "text-lg", subtitle: "text-xs" },
    md: { container: "h-32", text: "text-2xl", subtitle: "text-sm" },
    lg: { container: "h-40", text: "text-3xl", subtitle: "text-base" }
  };

  const currentSize = sizes[size];

  return (
    <div className={cn("bg-card rounded-lg p-4 shadow-sm border", className)}>
      <div className="text-center">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
      </div>
      
      <div className={cn("relative", currentSize.container)}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("font-bold text-foreground", currentSize.text)}>
            {clampedValue.toFixed(0)}%
          </div>
          <div className={cn("text-muted-foreground", currentSize.subtitle)}>
            Meta: {title.includes('Triagem') ? '85%' : '90%'}
          </div>
        </div>
      </div>
    </div>
  );
};