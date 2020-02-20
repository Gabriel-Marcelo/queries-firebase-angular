import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterUsuarioDto} from '../application/dto/usuario/obter-usuario.dto';
import {CriarUsuarioDto} from '../application/dto/usuario/criar-usuario.dto';
import * as firebase from 'firebase';
import {AlterarUsuarioDto} from '../application/dto/usuario/alterar-usuario.dto';


@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService extends FirestoreService<ObterUsuarioDto> {
  protected path;

  public async alterarUsuario(id: string, dto: AlterarUsuarioDto): Promise<void> {
    this.path = 'usuarios';
    return await super.update$(id, {
      celular: dto.celular,
      ids_lojas: dto.ids_lojas,
      nome: dto.nome,
      tipo: dto.tipo
    }).toPromise();
  }



  public async removerUsuario(id: string) {
    this.path = 'usuarios';
    return await super.update$(id, {excluido: true});
  }

  public async obterUsuarioComLojas(id: string) {
    const usuario = await this.obterUsuarioPorId(id);
    if (usuario.excluido === true) throw new Error ('Esse usuário não existe');
    const lojasUsuario = await this.obterLojas(usuario.ids_lojas);
    usuario.lojas = lojasUsuario;
    return usuario;
  }


  public async cadastrando(criarUserDto: CriarUsuarioDto) {
    firebase.auth().createUserWithEmailAndPassword(criarUserDto.email, criarUserDto.senha).then(async () =>
      await this.criarUsuario(criarUserDto)
    ).catch(() =>
      console.log('Não foi possível criar um usuário')
    );
  }

  private async obterUsuarioPorId(idUsuario: string): Promise<ObterUsuarioDto> {
    this.path = 'usuarios';
    return await super.docOnce$(idUsuario).toPromise();
  }

  private async criarUsuario(dto: CriarUsuarioDto): Promise<void> {
    this.path = 'users';
    const id = super.createId();
    return await super.create$(id, {
      id: id,
      celular: dto.celular,
      email: dto.email,
      ids_lojas: dto.ids_lojas,
      nome: dto.nome,
      tipo: dto.tipo,
      excluido: false
    }).toPromise();
  }

   private async obterIdLojasDoUsuario(idUsuario: string) {
    this.path = 'usuarios';
    const usuario = await super.docOnce$(idUsuario).toPromise();
    return usuario.lojas;
  }

  private async obterLojas(ids: string[]) {
    this.path = 'lojas';
    const lojas = await super.collectionOnce$((ref) =>
      ref.where('id', 'in', ids)
    ).toPromise();

    return lojas;
  }

}
