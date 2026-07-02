import { NextResponse } from "next/server";
import { TjpbProcess } from "@/feature/processes/types";

const mockTjpbProcesses: TjpbProcess[] = [
  {
    id: "tjpb-1",
    numero: "0801234-56.2023.8.15.2001",
    tribunal: "TJPB",
    status: "Ativo",
    dataCadastro: "2023-03-10T10:15:00Z",
    valor: 150000.0,
    orgaoJulgador: "4ª Vara Cível da Capital",
    classe: "Procedimento Comum Cível / Indenização por Dano Moral",
    partes: {
      autor: "Maria de Lourdes Ferreira",
      reu: "Telefônica Brasil S.A.",
    },
    juiz: "Dr. João Rocha de Araujo",
  },
  {
    id: "tjpb-2",
    numero: "0814521-89.2022.8.15.0001",
    tribunal: "TJPB",
    status: "Arquivado",
    dataCadastro: "2022-08-22T14:00:00Z",
    valor: 5000000.0,
    orgaoJulgador: "1ª Vara da Fazenda Pública de Campina Grande",
    classe: "Ação Civil Pública / Improbidade Administrativa",
    partes: {
      autor: "Ministério Público do Estado da Paraíba",
      reu: "Estado da Paraíba",
    },
    juiz: "Dra. Ana Maria Sales",
  },
  {
    id: "tjpb-3",
    numero: "0823456-12.2024.8.15.2001",
    tribunal: "TJPB",
    status: "Suspenso",
    dataCadastro: "2024-01-15T16:45:00Z",
    valor: 0.0,
    orgaoJulgador: "3ª Vara de Família de João Pessoa",
    classe: "Divórcio Consensual / Família",
    partes: {
      autor: "Pedro Henrique Alencar",
      reu: "Juliana Mendes Alencar",
    },
    juiz: "Dr. Marcos Aurelio Souza",
  },
  {
    id: "tjpb-4",
    numero: "0800112-23.2023.8.15.0251",
    tribunal: "TJPB",
    status: "Ativo",
    dataCadastro: "2023-11-05T11:20:00Z",
    valor: 45000.0,
    orgaoJulgador: "Vara Única de Patos",
    classe: "Execução de Título Extrajudicial / Contratos Bancários",
    partes: {
      autor: "Banco do Brasil S.A.",
      reu: "Comércio de Alimentos Silva Ltda",
    },
    juiz: "Dr. Luiz Gonzaga Neto",
  },
];

export async function GET() {
  return NextResponse.json(mockTjpbProcesses);
}
