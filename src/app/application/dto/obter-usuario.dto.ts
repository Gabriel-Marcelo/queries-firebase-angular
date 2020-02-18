
export class ObterUsuarioDto {
  id: string;
  nome: string;
  senha: string;
  tipo: string;
  celular: string;
  email: string;
  lojas: string[];


  constructor(id: string, nome: string, senha: string, tipo: string, celular: string, email: string, lojas: string[]) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.celular = celular;
    this.email = email;
    this.lojas = lojas;
  }
}
