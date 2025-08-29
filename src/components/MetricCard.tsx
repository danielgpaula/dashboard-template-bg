import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  variant: "blue" | "blue-dark" | "orange" | "red" | "green";
  className?: string;
}

const MetricCard = ({ title, value, variant, className }: MetricCardProps) => {
  const variantStyles = {
    blue: "bg-gradient-to-br from-dashboard-blue to-dashboard-blue-dark text-white",
    "blue-dark": "bg-gradient-to-br from-dashboard-blue-dark to-[hsl(217_91%_35%)] text-white",
    orange: "bg-gradient-to-br from-dashboard-orange to-[hsl(25_95%_45%)] text-white",
    red: "bg-gradient-to-br from-dashboard-red to-[hsl(0_84%_50%)] text-white",
    green: "bg-gradient-to-br from-dashboard-green to-[hsl(142_71%_35%)] text-white",
  };

  return (
    <div className={cn(
      "rounded-lg p-4 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-all duration-200",
      variantStyles[variant],
      className
    )}>
      <div className="text-xs opacity-90 mb-1 font-medium">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default MetricCard;