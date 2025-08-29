import { useState } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AtendimentoData } from '@/types/dashboard';

interface AttendantTableProps {
  data: AtendimentoData[];
  title: string;
}

type SortField = 'atendente' | 'mediaRegistro' | 'quantidade' | 'totalMinutos' | 'slaPercentual';
type SortOrder = 'asc' | 'desc';

export const AttendantTable = ({ data, title }: AttendantTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('mediaRegistro');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Process data by attendant
  const attendantStats = Object.values(
    data.reduce((acc, item) => {
      const atendente = item.atendente;
      if (!acc[atendente]) {
        acc[atendente] = {
          atendente,
          registros: [],
          totalMinutos: 0
        };
      }
      acc[atendente].registros.push(item.tempoRegistroMin);
      acc[atendente].totalMinutos += item.tempoRegistroMin;
      return acc;
    }, {} as Record<string, any>)
  ).map(stats => {
    const mediaRegistro = stats.registros.reduce((a: number, b: number) => a + b, 0) / stats.registros.length;
    const slaCount = stats.registros.filter((tempo: number) => tempo <= 5).length;
    const slaPercentual = (slaCount / stats.registros.length) * 100;
    
    return {
      atendente: stats.atendente,
      mediaRegistro,
      quantidade: stats.registros.length,
      totalMinutos: stats.totalMinutos,
      slaPercentual
    };
  });

  // Filter by search term
  const filteredStats = attendantStats.filter(stat =>
    stat.atendente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortedStats = [...filteredStats].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * multiplier;
    }
    return (aVal - bVal) * multiplier;
  });

  // Paginate
  const totalPages = Math.ceil(sortedStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStats = sortedStats.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getStatusBadge = (mediaRegistro: number) => {
    if (mediaRegistro <= 5) return <Badge className="bg-green-500 text-white">Bom</Badge>;
    if (mediaRegistro <= 10) return <Badge className="bg-yellow-500 text-white">Atenção</Badge>;
    return <Badge className="bg-red-500 text-white">Crítico</Badge>;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atendente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('atendente')}>
                <div className="flex items-center gap-2">
                  Atendente
                  {getSortIcon('atendente')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('mediaRegistro')}>
                <div className="flex items-center justify-end gap-2">
                  Média Registro (min)
                  {getSortIcon('mediaRegistro')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('quantidade')}>
                <div className="flex items-center justify-end gap-2">
                  Qtde Registros
                  {getSortIcon('quantidade')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('totalMinutos')}>
                <div className="flex items-center justify-end gap-2">
                  Total Minutos
                  {getSortIcon('totalMinutos')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('slaPercentual')}>
                <div className="flex items-center justify-end gap-2">
                  % Dentro SLA
                  {getSortIcon('slaPercentual')}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStats.map((stat) => (
              <TableRow key={stat.atendente} className="hover:bg-muted/50">
                <TableCell className="font-medium">{stat.atendente}</TableCell>
                <TableCell className="text-right">{stat.mediaRegistro.toFixed(2)}</TableCell>
                <TableCell className="text-right">{stat.quantidade.toLocaleString()}</TableCell>
                <TableCell className="text-right">{stat.totalMinutos.toFixed(1)}</TableCell>
                <TableCell className="text-right">{stat.slaPercentual.toFixed(1)}%</TableCell>
                <TableCell>{getStatusBadge(stat.mediaRegistro)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, sortedStats.length)} de {sortedStats.length} atendentes
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};