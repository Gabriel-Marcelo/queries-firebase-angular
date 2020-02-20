import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterSistemaDto} from '../application/dto/sistema/obter-sistema.dto';

@Injectable({
  providedIn: 'root'
})
export class SistemaFirestoreService extends FirestoreService<ObterSistemaDto> {

  protected path = 'sist';

  async obterSistemas(): Promise<ObterSistemaDto[]> {
     return await super.collectionOnce$().toPromise();
  }

}

