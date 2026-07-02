export interface ProcessBase {
  id: string;
  numero: string;
  tribunal: "TCE" | "TJPB";
  status: string;
  dataCadastro: string;
  valor?: number;
}

export interface TceProcess extends ProcessBase {
  relator: string;
  jurisdicionado: string;
  tipo: string;
}

export interface TjpbProcess extends ProcessBase {
  orgaoJulgador: string;
  classe: string;
  partes: {
    autor: string;
    reu: string;
  };
  juiz: string;
}

export type ProcessDetail = TceProcess | TjpbProcess;

export interface Movement {
  id: string;
  data: string;
  descricao: string;
  responsavel: string;
  detalhes?: string;
}
