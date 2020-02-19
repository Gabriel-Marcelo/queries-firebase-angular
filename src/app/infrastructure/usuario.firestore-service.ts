import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterUsuarioDto} from '../application/dto/obter-usuario.dto';
import {CriarUsuarioDto} from '../application/dto/criar-usuario.dto';
import {AlterarUsuarioDto} from '../application/dto/alterar-usuario.dto';
import {LojaFirestoreService} from './loja.firestore-service';
import * as firebase from 'firebase';
import {CadastrarUsuarioDto} from '../application/dto/cadastrar-usuario.dto';



@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService extends FirestoreService<ObterUsuarioDto> {
  protected path;

  public async obterUsuarios() {
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
      ids_lojas: dto.ids_lojas,
      nome: dto.nome,
      senha: dto.senha,
      tipo: dto.tipo
    }).toPromise();
  }
  //
  // async alterarUsuario(id: string, dto: AlterarUsuarioDto): Promise<void> {
  //   this.path = 'usuarios';
  //   return await super.update$(id, {
  //     celular: dto.celular,
  //     email: dto.email,
  //     id: id,
  //     lojas: dto.lojas,
  //     nome: dto.nome,
  //     senha: dto.senha,
  //     tipo: dto.tipo
  //   }).toPromise();
  // }

  public async removerUsuario(id: string) {
    this.path = 'usuarios';
    return await super.delete$(id).toPromise();
  }

   // async obterUsuariosComLojas() {
   //    this.path = 'lojas';
   //    const lojas = await super.collectionOnce$().toPromise();
   //    this.path = 'usuarios';
   //    const usuarios = await super.collectionOnce$().toPromise();
   //    console.log(lojas);
   //    console.log(usuarios);
   // }

  //  async obterUsuariosComChamados() {
  //   this.path = 'usuarios';
  //   //const promisse = super.collectionOnce$(ref => ref.doc().collection('chamados')).toPromise();
  //   // const promisse = await super.docOnce$('CArgQ6dwKYgBhjqdK3ue').toPromise()
  //    const promisse = super.collectionOnce$().toPromise();
  //    promisse.then((value) => {
  //
  //    })
  //   console.log('promisse:');
  //   console.log(promisse);
  //
  // }

  /*async obterUsuarioPorId(id: string) {
    this.path = 'usuarios' + id;
    return await super.collectionOnce$().toPromise();
  }*/

  private async obterUsuarioPorId(idUsuario: string): Promise<ObterUsuarioDto> {
    this.path = 'usuarios';
    return await super.docOnce$(idUsuario).toPromise();
  }


   private async obterIdLojasDoUsuario(idUsuario: string) {
    this.path = 'usuarios';
    const usuario = await super.docOnce$(idUsuario).toPromise()
    return usuario.lojas;
  }

  private async obterLojas(ids: string[]) {
    this.path = 'lojas';
    const lojas = await super.collectionOnce$((ref) =>
      ref.where('id', 'in', ids)
    ).toPromise();

    return lojas;
  }

  public async obterUsuarioComLojas(id: string) {
     const usuario = await this.obterUsuarioPorId(id);
     const lojasUsuario = await this.obterLojas(usuario.ids_lojas);
     usuario.lojas = lojasUsuario;
     return usuario;
  }

  async cadastrando(dto: CadastrarUsuarioDto, idUser: string) {
    firebase.auth().createUserWithEmailAndPassword(dto.email, dto.senha).then(async () =>
      await this.obterUsuarioComLojas(idUser)
    ).catch((err) =>
      alert('Error')
    );
  }


  /*public async obterTodosOsUsuariosComSuasRespectivasLojas() {
    const usuarios = await this.obterUsuarios();
    let idsLojasDosUsuarios = [];
    usuarios.forEach(usuario => idsLojasDosUsuarios.push(usuario.lojas));
    let lojasUsuarios =  [];
    idsLojasDosUsuarios.forEach(ids => lojasUsuarios.push(this.obterLojasPorId(ids)));
  }*/

  // private async lojas(ids: string[]) {
  //   let lojas = [];
  //   for (let id in ids) {
  //     lojas.push(await this.obterLojasPorId(id))
  //   }
  // }

  // private concatenarUsuariosELojas(usuarios: ObterUsuarioDto[], lojas: any[]) {
  //   let aux = [[]];
  //   aux[0].push(usuarios[0]);
  //   aux[0].push(lojas[0]);
  //   return aux;
  // }

}
