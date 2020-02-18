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

}
