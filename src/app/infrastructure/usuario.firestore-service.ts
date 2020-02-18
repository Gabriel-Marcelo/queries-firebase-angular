import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterUsuarioDto} from '../application/dto/obter-usuario.dto';
import {CriarUsuarioDto} from '../application/dto/criar-usuario.dto';
import {AlterarUsuarioDto} from '../application/dto/alterar-usuario.dto';



@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService extends FirestoreService<ObterUsuarioDto> {
  protected path;



  async obterUsuarios() {
    this.path = 'usuarios';
    return await super.collectionOnce$().toPromise();
  }

  async criarUsuario(dto: CriarUsuarioDto): Promise<void> {
    this.path = 'usuarios';
    const id = super.createId();
    return await super.create$(id, {
      id: id,
      celular: dto.celular,
      email: dto.email,
      lojas: dto.lojas,
      nome: dto.nome,
      senha: dto.senha,
      tipo: dto.tipo
    }).toPromise();
  }

  async alterarUsuario(id: string, dto: AlterarUsuarioDto): Promise<void> {
    this.path = 'usuarios';
    return await super.update$(id, {
      celular: dto.celular,
      email: dto.email,
      id: id,
      lojas: dto.lojas,
      nome: dto.nome,
      senha: dto.senha,
      tipo: dto.tipo
    }).toPromise();
  }

  async removerUsuario(id: string) {
    this.path = 'usuarios';
    return await super.delete$(id).toPromise();
  }



}
