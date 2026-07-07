export type ProcessOrigin = "TCE-PB" | "TJPB";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ProcessSummary {
  id: string;
  numero: string;
  dataPublicacao: string;
  origem: ProcessOrigin;
}

export interface ProcessParticipant {
  id: string;
  nome: string;
  oab: string | null;
  documento: string | null;
}

export interface ProcessParty {
  processoId: string;
  participanteId: string;
  isPoloAtivo: boolean | null;
  isPoloPassivo: boolean | null;
  qualificacao: string;
  participante: ProcessParticipant;
}

export interface ProcessDetail extends ProcessSummary {
  polosProcessos: ProcessParty[];
}

export interface MovementAttachment {
  id: string;
  processoId: string;
  movimentoId: string;
  linkAnexo: string;
}

export interface Movement {
  id: string;
  processoId: string;
  dataMovimentacao: string;
  titulo: string;
  temAnexo: boolean;
  anexos: MovementAttachment[];
}
