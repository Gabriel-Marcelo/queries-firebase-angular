
export class AlterarUsuarioDto {
  celular: string;
  ids_lojas: string[];
  nome: string;
  tipo: string;

  constructor(celular: string, ids_lojas: string[], nome: string, tipo: string) {
    this.celular = celular;
    this.ids_lojas = ids_lojas;
    this.nome = nome;
    this.tipo = tipo;
  }
}
