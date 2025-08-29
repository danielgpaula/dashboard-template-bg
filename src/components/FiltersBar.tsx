import { Calendar, Filter, X, Users, Clock, Building, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardFilters } from "@/types/dashboard";

interface FiltersBarProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  uniqueUnidades: string[];
  uniqueAtendentes: string[];
  uniqueTurnos: string[];
  uniqueTipos: string[];
  totalRegistros: number;
}

export const FiltersBar = ({
  filters,
  onFiltersChange,
  uniqueUnidades,
  uniqueAtendentes,
  uniqueTurnos,
  uniqueTipos,
  totalRegistros
}: FiltersBarProps) => {
  const setPeriodo = (preset: "hoje" | "7d" | "15d" | "30d") => {
    const fim = new Date();
    let inicio = new Date();
    
    switch (preset) {
      case "hoje":
        inicio.setHours(0, 0, 0, 0);
        break;
      case "7d":
        inicio.setDate(fim.getDate() - 7);
        break;
      case "15d":
        inicio.setDate(fim.getDate() - 15);
        break;
      case "30d":
        inicio.setDate(fim.getDate() - 30);
        break;
    }
    
    onFiltersChange({
      ...filters,
      periodo: { inicio, fim, preset }
    });
  };

  const toggleMultiSelect = (field: keyof Pick<DashboardFilters, 'unidades' | 'atendentes' | 'turnos' | 'tiposAtendimento'>, value: string) => {
    const currentValues = filters[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [field]: newValues
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      periodo: filters.periodo,
      unidades: [],
      atendentes: [],
      turnos: [],
      tiposAtendimento: []
    });
  };

  const activeFiltersCount = 
    filters.unidades.length + 
    filters.atendentes.length + 
    filters.turnos.length + 
    filters.tiposAtendimento.length;

  return (
    <div className="bg-card border-b border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
        <div className="text-sm text-muted-foreground">
          {totalRegistros.toLocaleString()} registros encontrados
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Período */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={filters.periodo.preset} onValueChange={setPeriodo}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="15d">15 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Unidades */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Building className="h-4 w-4 mr-2" />
              Unidades
              {filters.unidades.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {filters.unidades.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-2">
              {uniqueUnidades.map(unidade => (
                <div key={unidade} className="flex items-center space-x-2">
                  <Checkbox
                    id={`unidade-${unidade}`}
                    checked={filters.unidades.includes(unidade)}
                    onCheckedChange={() => toggleMultiSelect('unidades', unidade)}
                  />
                  <label
                    htmlFor={`unidade-${unidade}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {unidade}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Atendentes */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Atendentes
              {filters.atendentes.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {filters.atendentes.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-2">
              {uniqueAtendentes.map(atendente => (
                <div key={atendente} className="flex items-center space-x-2">
                  <Checkbox
                    id={`atendente-${atendente}`}
                    checked={filters.atendentes.includes(atendente)}
                    onCheckedChange={() => toggleMultiSelect('atendentes', atendente)}
                  />
                  <label
                    htmlFor={`atendente-${atendente}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {atendente}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Turnos */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Turnos
              {filters.turnos.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {filters.turnos.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3">
            <div className="space-y-2">
              {uniqueTurnos.map(turno => (
                <div key={turno} className="flex items-center space-x-2">
                  <Checkbox
                    id={`turno-${turno}`}
                    checked={filters.turnos.includes(turno)}
                    onCheckedChange={() => toggleMultiSelect('turnos', turno)}
                  />
                  <label
                    htmlFor={`turno-${turno}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {turno}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Tipos de Atendimento */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Stethoscope className="h-4 w-4 mr-2" />
              Tipos
              {filters.tiposAtendimento.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {filters.tiposAtendimento.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3">
            <div className="space-y-2">
              {uniqueTipos.map(tipo => (
                <div key={tipo} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tipo-${tipo}`}
                    checked={filters.tiposAtendimento.includes(tipo)}
                    onCheckedChange={() => toggleMultiSelect('tiposAtendimento', tipo)}
                  />
                  <label
                    htmlFor={`tipo-${tipo}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {tipo}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.unidades.map(unidade => (
            <Badge key={`unidade-${unidade}`} variant="secondary" className="gap-1">
              {unidade}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleMultiSelect('unidades', unidade)}
              />
            </Badge>
          ))}
          {filters.atendentes.map(atendente => (
            <Badge key={`atendente-${atendente}`} variant="secondary" className="gap-1">
              {atendente}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleMultiSelect('atendentes', atendente)}
              />
            </Badge>
          ))}
          {filters.turnos.map(turno => (
            <Badge key={`turno-${turno}`} variant="secondary" className="gap-1">
              {turno}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleMultiSelect('turnos', turno)}
              />
            </Badge>
          ))}
          {filters.tiposAtendimento.map(tipo => (
            <Badge key={`tipo-${tipo}`} variant="secondary" className="gap-1">
              {tipo}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleMultiSelect('tiposAtendimento', tipo)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};