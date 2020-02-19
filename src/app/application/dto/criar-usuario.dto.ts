
export class CriarUsuarioDto {
  nome: string;
  senha: string;
  tipo: string;
  celular: string;
  email: string;
  ids_lojas: string[];


  constructor(nome: string, senha: string, tipo: string, celular: string, email: string, lojas: string[]) {
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.celular = celular;
    this.email = email;
    this.ids_lojas = lojas;
  }
}
