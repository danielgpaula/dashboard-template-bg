import { AtendimentoData } from '@/types/dashboard';

const unidades = [
  "ANA LUIZA VIEIRA",
  "HOSPITAL CENTRAL", 
  "PRONTO SOCORRO NORTE",
  "UPA SUL",
  "CENTRO MÉDICO OESTE"
];

const atendentes = [
  "JOELENE CRISTINA",
  "MARIA SILVA",
  "JOÃO SANTOS", 
  "ANA PAULA",
  "CARLOS OLIVEIRA",
  "FERNANDA COSTA",
  "RAFAEL LIMA",
  "PATRÍCIA ALVES"
];

const turnos: Array<"Manhã" | "Tarde" | "Noite"> = ["Manhã", "Tarde", "Noite"];
const tipos: Array<"Emergência" | "Eletivo" | "Outros"> = ["Emergência", "Eletivo", "Outros"];

export const generateMockData = (count: number): AtendimentoData[] => {
  const data: AtendimentoData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    // Generate dates within last 30 days
    const daysBack = Math.floor(Math.random() * 30);
    const hoursBack = Math.floor(Math.random() * 24);
    const minutesBack = Math.floor(Math.random() * 60);
    
    const dataHora = new Date(now);
    dataHora.setDate(dataHora.getDate() - daysBack);
    dataHora.setHours(dataHora.getHours() - hoursBack);
    dataHora.setMinutes(dataHora.getMinutes() - minutesBack);
    
    data.push({
      dataHora: dataHora.toISOString(),
      unidade: unidades[Math.floor(Math.random() * unidades.length)],
      atendente: atendentes[Math.floor(Math.random() * atendentes.length)],
      turno: turnos[Math.floor(Math.random() * turnos.length)],
      tipoAtendimento: tipos[Math.floor(Math.random() * tipos.length)],
      aguardandoRegistroMin: Math.random() * 10 + 1, // 1-11 min
      tempoRegistroMin: Math.random() * 15 + 2, // 2-17 min
      aguardandoTriagemMin: Math.random() * 20 + 2, // 2-22 min
      tempoTriagemMin: Math.random() * 12 + 3, // 3-15 min
    });
  }
  
  return data.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());
};