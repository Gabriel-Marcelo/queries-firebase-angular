import {ObterLojaDto} from './obter-loja.dto';

export class ObterUsuarioDto {
  id: string;
  nome: string;
  senha: string;
  tipo: string;
  celular: string;
  email: string;
  ids_lojas: string[];
  lojas: ObterLojaDto[];


  constructor(id: string, nome: string, senha: string, tipo: string, celular: string, email: string, lojas: string[]) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.celular = celular;
    this.email = email;
    this.ids_lojas = lojas;
  }
}
