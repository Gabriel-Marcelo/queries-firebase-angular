import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterSistemaDto} from '../application/dto/sistema/obter-sistema.dto';
import {formatNumber} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SistemaFirestoreService extends FirestoreService<ObterSistemaDto> {

  protected path = 'sist';
  public async obterSistemasComProblemas(): Promise<any[]> {
    const sistemasComProblemas = [];
    await super.collectionOnce$(ref => {
      ref.get().then(querySnapshotSistemas => querySnapshotSistemas.forEach( queryDocumentSnapshotSistemas =>  {
        const dadosProblemas = [];
        ref.doc(queryDocumentSnapshotSistemas.id).collection('problemas').get().then(querySnapshotProblemas =>
          querySnapshotProblemas.forEach(queryDocumentSnapshotProblemas => dadosProblemas.push(queryDocumentSnapshotProblemas.data())));
        const item = {
          nome: queryDocumentSnapshotSistemas.id,
          problemas: dadosProblemas
        };
        sistemasComProblemas.push(item);
        }));
      return ref;
    }).toPromise();
    return sistemasComProblemas;
  }

}

