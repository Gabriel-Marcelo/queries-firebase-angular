
export class CriarUsuarioDto {
  nome: string;
  tipo: string;
  celular: string;
  email: string;
  ids_lojas: string[];
  senha: string;


  constructor(nome: string, tipo: string, celular: string, email: string, lojas: string[], senha: string) {
    this.nome = nome;
    this.tipo = tipo;
    this.celular = celular;
    this.email = email;
    this.ids_lojas = lojas;
    this.senha = senha;
  }
}
