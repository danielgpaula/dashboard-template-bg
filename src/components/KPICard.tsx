import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { KPIData } from "@/types/dashboard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  data: KPIData;
  icon: React.ReactNode;
  className?: string;
}

export const KPICard = ({ title, data, icon, className }: KPICardProps) => {
  const getStatusColor = () => {
    switch (data.status) {
      case "success":
        return "from-green-500 to-green-600 text-white";
      case "warning":
        return "from-yellow-500 to-orange-500 text-white";
      case "critical":
        return "from-red-500 to-red-600 text-white";
      default:
        return "from-blue-500 to-blue-600 text-white";
    }
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return icon;
    }
  };

  const getDeltaIcon = () => {
    return data.deltaPercentual >= 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    );
  };

  const getDeltaColor = () => {
    if (data.deltaPercentual >= 0) {
      return data.status === "critical" ? "text-green-300" : "text-green-500";
    } else {
      return "text-red-300";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "rounded-lg p-4 bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer",
            getStatusColor(),
            className
          )}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs opacity-90 font-medium flex items-center gap-1">
                {getStatusIcon()}
                {title}
              </div>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-1.5 py-0.5 bg-white/20 text-white flex items-center gap-1",
                  getDeltaColor()
                )}
              >
                {getDeltaIcon()}
                {Math.abs(data.deltaPercentual).toFixed(1)}%
              </Badge>
            </div>
            
            <div className="text-2xl font-bold mb-1">
              {data.valor.toFixed(2)} min
            </div>
            
            <div className="text-xs opacity-80">
              {data.amostras.toLocaleString()} amostras
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-48">
          <div className="space-y-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm">
              <div>Média: {data.valor.toFixed(2)} min</div>
              <div>P95: {data.p95.toFixed(2)} min</div>
              <div>Amostras: {data.amostras.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                {getDeltaIcon()}
                <span className={data.deltaPercentual >= 0 ? "text-green-500" : "text-red-500"}>
                  {data.deltaPercentual >= 0 ? "+" : ""}{data.deltaPercentual.toFixed(1)}% vs período anterior
                </span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};