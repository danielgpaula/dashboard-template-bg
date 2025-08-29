import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StaffMember {
  name: string;
  waiting: number;
  registered: number;
  total: number;
}

const StaffTable = () => {
  const staffData: StaffMember[] = [
    { name: "ALEXANDRA GOIS", waiting: 77, registered: 5, total: 82 },
    { name: "ALEXANDRE ALAGI", waiting: 75, registered: 8, total: 83 },
    { name: "ALEXANDRE ANDRE", waiting: 71, registered: 12, total: 83 },
    { name: "ISABELA SANTOS", waiting: 69, registered: 3, total: 72 },
    { name: "ISABELLA MONTEZ", waiting: 24, registered: 1, total: 25 },
    { name: "NATHAM CERQUEI", waiting: 23, registered: 2, total: 25 },
    { name: "ULISSES FERREIR", waiting: 21, registered: 1, total: 22 },
    { name: "ULNA GONÇALVES", waiting: 21, registered: 3, total: 24 },
    { name: "WESLEI BARROS", waiting: 18, registered: 1, total: 19 },
  ];

  return (
    <div className="bg-card rounded-lg p-4 shadow-[--shadow-card]">
      <h3 className="text-sm font-medium text-foreground mb-4">
        Resumo dos registros por profissional de atendimento (parciais)
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Atendente</TableHead>
              <TableHead className="text-xs text-center">Aguardando</TableHead>
              <TableHead className="text-xs text-center">Já registrados</TableHead>
              <TableHead className="text-xs text-center">Total registrados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell className="text-xs font-medium">{staff.name}</TableCell>
                <TableCell className="text-xs text-center">
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-dashboard-blue text-white rounded text-xs font-medium">
                    {staff.waiting}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-center">
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-dashboard-green text-white rounded text-xs font-medium">
                    {staff.registered}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-center">
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-dashboard-gray text-white rounded text-xs font-medium">
                    {staff.total}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffTable;