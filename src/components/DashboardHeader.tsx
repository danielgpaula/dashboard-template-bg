import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            Painel Gerencial | Atendimento
          </h1>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          TOTVS
        </div>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-medium">21 Set 2023</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-sm text-foreground font-medium">21 Set 2023 - 29 Set</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Emergências
          </Button>
          <Button variant="default" size="sm">
            Todos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;