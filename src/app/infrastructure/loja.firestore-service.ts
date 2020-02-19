import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterLojaDto} from '../application/dto/obter-loja.dto';

@Injectable({
  providedIn: 'root'
})
export class LojaFirestoreService extends FirestoreService<ObterLojaDto> {
  protected path;

  async obterLojas(): Promise<ObterLojaDto[]> {
    this.path = 'lojas';
    return await super.collectionOnce$().toPromise();
  }

 /* async obterLojasPorIdUsuario(id: string) {
    this.path = 'lojas';
    return await super.collectionOnce$(ref =>
      ref.where('id', '==', id)
    ).toPromise();
  }*/

  //Está funcionando
  // async obterLojaPorId(id: string) {
  //   this.path = 'lojas';
  //   const loja = await super.docOnce$(id).toPromise();
  //   return loja;
  // }



}
