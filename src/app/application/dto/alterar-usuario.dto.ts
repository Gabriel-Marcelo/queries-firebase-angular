
export class AlterarUsuarioDto {

  nome: string;
  senha: string;
  tipo: string;
  celular: string;
  email: string;
  lojas: string[];


  constructor(nome: string, senha: string, tipo: string, celular: string, email: string, lojas: string[]) {
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.celular = celular;
    this.email = email;
    this.lojas = lojas;
  }

}
