import { NextResponse } from "next/server";
import { TceProcess } from "@/feature/processes/types";

const mockTceProcesses: TceProcess[] = [
  {
    id: "tce-1",
    numero: "01234/21",
    tribunal: "TCE",
    status: "Aprovado",
    dataCadastro: "2021-04-12T09:00:00Z",
    valor: 2500000.0,
    relator: "Conselheiro Arnóbio Viana",
    jurisdicionado: "Prefeitura Municipal de Cabedelo",
    tipo: "Prestação de Contas Anual",
  },
  {
    id: "tce-2",
    numero: "08420/22",
    tribunal: "TCE",
    status: "Pendente",
    dataCadastro: "2022-09-05T14:30:00Z",
    valor: 450000.0,
    relator: "Conselheiro Fábio Nogueira",
    jurisdicionado: "Câmara Municipal de Campina Grande",
    tipo: "Denúncia de irregularidade em Licitação",
  },
  {
    id: "tce-3",
    numero: "12300/23",
    tribunal: "TCE",
    status: "Irregular",
    dataCadastro: "2023-01-20T10:00:00Z",
    valor: 12000000.0,
    relator: "Conselheira Soraia Alencar",
    jurisdicionado: "Secretaria de Saúde da Paraíba",
    tipo: "Inspeção Especial",
  },
  {
    id: "tce-4",
    numero: "00321/24",
    tribunal: "TCE",
    status: "Em instrução",
    dataCadastro: "2024-02-15T16:00:00Z",
    valor: 850000.0,
    relator: "Conselheiro Nominando Diniz",
    jurisdicionado: "Prefeitura Municipal de Patos",
    tipo: "Acompanhamento de Gestão",
  },
  {
    id: "tce-5",
    numero: "00599/24",
    tribunal: "TCE",
    status: "Aprovado",
    dataCadastro: "2024-03-01T11:00:00Z",
    valor: 1200000.0,
    relator: "Conselheiro André Carlo Torres",
    jurisdicionado: "Prefeitura Municipal de Sousa",
    tipo: "Prestação de Contas Anual",
  },
];

export async function GET() {
  return NextResponse.json(mockTceProcesses);
}
