import { useQuery } from '@tanstack/react-query';
import { getInternacoes, getTemposAtendimento } from './services';

export const useInternacoes = () =>
  useQuery({ 
    queryKey: ['internacoes'], 
    queryFn: getInternacoes, 
    staleTime: 5 * 60 * 1000 
  });

export const useTemposAtendimento = () =>
  useQuery({ 
    queryKey: ['tempos-atendimento'], 
    queryFn: getTemposAtendimento, 
    staleTime: 5 * 60 * 1000 
  });