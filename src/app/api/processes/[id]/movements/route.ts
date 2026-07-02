import { NextResponse } from "next/server";
import { Movement } from "@/feature/processes/types";

const mockMovementsMap: Record<string, Movement[]> = {
  "tce-1": [
    {
      id: "mov-tce-1-1",
      data: "2021-04-12T09:00:00Z",
      descricao: "Autuação do Processo",
      responsavel: "Setor de Protocolo Geral (TCE-PB)",
      detalhes: "Processo autuado eletronicamente e registrado sob o número 01234/21.",
    },
    {
      id: "mov-tce-1-2",
      data: "2021-05-18T14:30:00Z",
      descricao: "Distribuição ao Gabinete do Relator",
      responsavel: "Secretaria Geral do Pleno",
      detalhes: "Processo distribuído ao relator Conselheiro Arnóbio Viana por sorteio eletrônico.",
    },
    {
      id: "mov-tce-1-3",
      data: "2021-09-10T10:00:00Z",
      descricao: "Emissão de Relatório de Instrução",
      responsavel: "Auditoria de Contas Municipais",
      detalhes: "Relatório inicial emitido pela auditoria técnica apontando conformidade com ressalvas.",
    },
    {
      id: "mov-tce-1-4",
      data: "2021-11-25T16:00:00Z",
      descricao: "Parecer do Ministério Público de Contas",
      responsavel: "Procuradoria de Contas (MPC)",
      detalhes: "Procurador do MPC emite parecer recomendando a regularidade com ressalvas das contas apresentadas.",
    },
    {
      id: "mov-tce-1-5",
      data: "2022-02-10T11:00:00Z",
      descricao: "Julgamento - Regular com Ressalvas",
      responsavel: "Tribunal Pleno",
      detalhes: "Acórdão publicado decidindo pela aprovação das contas do exercício com recomendações.",
    },
  ],
  "tce-2": [
    {
      id: "mov-tce-2-1",
      data: "2022-09-05T14:30:00Z",
      descricao: "Protocolo de Denúncia",
      responsavel: "Protocolo Central",
      detalhes: "Denúncia registrada por cidadão referente a suposta fraude licitatória.",
    },
    {
      id: "mov-tce-2-2",
      data: "2022-10-12T09:15:00Z",
      descricao: "Distribuição para Relator",
      responsavel: "Secretaria de Coordenação do Pleno",
      detalhes: "Relator Conselheiro Fábio Nogueira.",
    },
    {
      id: "mov-tce-2-3",
      data: "2022-12-18T16:45:00Z",
      descricao: "Envio para Diligência Técnica",
      responsavel: "Gabinete do Relator",
      detalhes: "Determinada a notificação do ordenador de despesas para manifestação em 15 dias.",
    },
  ],
  "tce-3": [
    {
      id: "mov-tce-3-1",
      data: "2023-01-20T10:00:00Z",
      descricao: "Determinação de Inspeção Especial",
      responsavel: "Presidência do TCE-PB",
      detalhes: "Instaurada inspeção especial de acompanhamento de folha de pagamento na Secretaria de Saúde.",
    },
    {
      id: "mov-tce-3-2",
      data: "2023-05-15T11:30:00Z",
      descricao: "Relatório de Auditoria Conclusivo",
      responsavel: "Diretoria de Fiscalização de Obras e Serviços Públicos",
      detalhes: "Relatório técnico aponta graves inconsistências em contratos de terceirização.",
    },
    {
      id: "mov-tce-3-3",
      data: "2023-10-02T14:20:00Z",
      descricao: "Citação dos Responsáveis",
      responsavel: "Departamento de Intimações e Notificações",
      detalhes: "Citação enviada aos gestores do órgão público para apresentarem defesa.",
    },
    {
      id: "mov-tce-3-4",
      data: "2024-05-10T10:00:00Z",
      descricao: "Julgamento de Irregularidade",
      responsavel: "Segunda Câmara",
      detalhes: "Decidido por unanimidade pela irregularidade das contas, com aplicação de multa administrativa.",
    },
  ],
  "tce-4": [
    {
      id: "mov-tce-4-1",
      data: "2024-02-15T16:00:00Z",
      descricao: "Abertura de Processo de Acompanhamento",
      responsavel: "Seção de Acompanhamento de Gestão",
      detalhes: "Processo aberto automaticamente para monitoramento de gastos municipais.",
    },
    {
      id: "mov-tce-4-2",
      data: "2024-06-01T15:30:00Z",
      descricao: "Juntada de Documentação de Convênios",
      responsavel: "Prefeitura Municipal de Patos",
      detalhes: "Documentação contábil digitalizada enviada via portal do gestor.",
    },
  ],
  "tce-5": [
    {
      id: "mov-tce-5-1",
      data: "2024-03-01T11:00:00Z",
      descricao: "Instalação da Prestação de Contas",
      responsavel: "Protocolo Geral",
    },
  ],
  "tjpb-1": [
    {
      id: "mov-tjpb-1-1",
      data: "2023-03-10T10:15:00Z",
      descricao: "Distribuição por Sorteio",
      responsavel: "Distribuidor Cível (Comarca de João Pessoa)",
      detalhes: "Processo distribuído à 4ª Vara Cível da Capital.",
    },
    {
      id: "mov-tjpb-1-2",
      data: "2023-03-12T14:00:00Z",
      descricao: "Concluso para Despacho Inicial",
      responsavel: "Gabinete do Juiz",
      detalhes: "Remessa ao magistrado Dr. João Rocha de Araujo.",
    },
    {
      id: "mov-tjpb-1-3",
      data: "2023-03-15T16:45:00Z",
      descricao: "Expedição de Mandado de Citação",
      responsavel: "Secretaria de Vara Cível",
      detalhes: "Expedido mandado eletrônico de citação para a empresa Telefônica Brasil S.A.",
    },
    {
      id: "mov-tjpb-1-4",
      data: "2023-04-05T11:20:00Z",
      descricao: "Juntada de Carta de Citação Positiva",
      responsavel: "Central de Mandados / Oficial de Justiça",
      detalhes: "Certidão de citação cumprida com sucesso adicionada aos autos virtuais.",
    },
    {
      id: "mov-tjpb-1-5",
      data: "2023-04-20T18:00:00Z",
      descricao: "Apresentação de Contestação",
      responsavel: "Réu (Telefônica Brasil S.A.)",
      detalhes: "Petição de defesa protocolada pelo procurador da empresa ré.",
    },
    {
      id: "mov-tjpb-1-6",
      data: "2023-05-02T09:30:00Z",
      descricao: "Ato Ordinatório - Manifestação sobre Contestação",
      responsavel: "Secretaria de Vara Cível",
      detalhes: "Intimação da parte autora para se manifestar sobre a contestação (réplica).",
    },
  ],
  "tjpb-2": [
    {
      id: "mov-tjpb-2-1",
      data: "2022-08-22T14:00:00Z",
      descricao: "Distribuição da Ação Civil Pública",
      responsavel: "Distribuidor Judicial (Campina Grande)",
    },
    {
      id: "mov-tjpb-2-2",
      data: "2022-09-10T10:10:00Z",
      descricao: "Despacho - Deferimento de Liminar",
      responsavel: "Juízo da 1ª Vara da Fazenda Pública",
      detalhes: "Decisão interlocutória deferindo em parte o pedido de liminar do Ministério Público.",
    },
    {
      id: "mov-tjpb-2-3",
      data: "2023-02-15T15:20:00Z",
      descricao: "Instrução e Julgamento Realizada",
      responsavel: "Sala de Audiências",
      detalhes: "Oitiva de testemunhas e depoimento dos réus concluído.",
    },
    {
      id: "mov-tjpb-2-4",
      data: "2023-06-25T11:00:00Z",
      descricao: "Trânsito em Julgado",
      responsavel: "Secretaria da Vara",
      detalhes: "Certificado o trânsito em julgado da sentença condenatória.",
    },
  ],
  "tjpb-3": [
    {
      id: "mov-tjpb-3-1",
      data: "2024-01-15T16:45:00Z",
      descricao: "Protocolo de Ação Consensual",
      responsavel: "Distribuidor Geral de João Pessoa",
    },
    {
      id: "mov-tjpb-3-2",
      data: "2024-03-20T10:00:00Z",
      descricao: "Suspensão do Processo por Prazo",
      responsavel: "Gabinete do Juiz",
      detalhes: "Homologado acordo e suspensa a tramitação conforme petição das partes.",
    },
  ],
  "tjpb-4": [
    {
      id: "mov-tjpb-4-1",
      data: "2023-11-05T11:20:00Z",
      descricao: "Distribuição da Execução de Título Extrajudicial",
      responsavel: "Distribuidor Cível de Patos",
    },
    {
      id: "mov-tjpb-4-2",
      data: "2024-01-18T09:30:00Z",
      descricao: "Expedição de Mandado de Penhora",
      responsavel: "Secretaria de Vara Única de Patos",
    },
    {
      id: "mov-tjpb-4-3",
      data: "2024-04-10T14:00:00Z",
      descricao: "Juntada de Auto de Penhora de Bens",
      responsavel: "Oficial de Justiça",
      detalhes: "Penhorado veículo de propriedade da executada.",
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const movements = mockMovementsMap[id] || [];

  return NextResponse.json(movements);
}
