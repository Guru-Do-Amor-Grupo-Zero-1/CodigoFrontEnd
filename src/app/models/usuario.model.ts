export interface Usuario {
  id?: number;  // opcional
  nomeUsuario: string;  // Alterado de "nome" para "nomeUsuario"
  idade: number;
  telefone: string;
  endereco: string;
  numero: string;
  cep: string;
  signoUsuario?: string;
}
