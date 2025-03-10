export interface Usuario {
  id?: number;  // `id` é opcional
  nome: string;
  idade: number;
  telefone: string;  // `telefone` é do tipo `string` para armazenar números com formatação
  endereco: string;
  numero: string;
  cep: string;
  signo?: string;  // `signo` é opcional
}
