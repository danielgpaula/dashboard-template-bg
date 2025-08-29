import { Activity, Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const DashboardHeader = () => {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Painel Gerencial
              </h1>
              <p className="text-sm text-muted-foreground">Atendimento Externo</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="font-medium">TOTVS Healthcare</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;