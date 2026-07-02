import { NextResponse } from "next/server";
import { TceProcess, TjpbProcess } from "@/feature/processes/types";

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
    valor: 4500.0,
    orgaoJulgador: "Vara Única de Patos",
    classe: "Execução de Título Extrajudicial / Contratos Bancários",
    partes: {
      autor: "Banco do Brasil S.A.",
      reu: "Comércio de Alimentos Silva Ltda",
    },
    juiz: "Dr. Luiz Gonzaga Neto",
  },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const allProcesses = [...mockTceProcesses, ...mockTjpbProcesses];
  const process = allProcesses.find((p) => p.id === id);

  if (!process) {
    return NextResponse.json(
      { error: `Processo com ID ${id} não encontrado` },
      { status: 404 }
    );
  }

  return NextResponse.json(process);
}
