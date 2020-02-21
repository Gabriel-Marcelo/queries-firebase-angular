import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterSistemaDto} from '../application/dto/sistema/obter-sistema.dto';
import {formatNumber} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SistemaFirestoreService extends FirestoreService<ObterSistemaDto> {

  protected path = 'sist';
  private async obterSistemas(): Promise<ObterSistemaDto[]> {
     return await super.collectionOnce$().toPromise();
  }

  //  private async obterIdsSistemas(): Promise<any[]> {
  //   const sistemas = await this.obterSistemas();
  //   let ids = [];
  //   sistemas.forEach((sistema) => {
  //     ids.push(sistema.id)
  //   });
  //   return ids;
  // }

  // private obterProblemasPeloIdSistema(id: string) {
  //
  // }

  // public async obterSistemasComProblemas() {
  //   const sistemas = await this.obterSistemas();
  //   let problemas = [];
  //   sistemas.forEach((sistema) => {
  //     this.path = 'sist/' + sistema.id + '/problemas';
  //     problemas = super.collectionOnce$().toPromise()
  //   })
  //   console.log(problemas);
  // }

  private async obterSistemaPor(idSist: string) {
    this.path = 'sist';
    return await super.docOnce$(idSist).toPromise();
  }

  public async obterSistemaComProblemas(idSist: string) {
    this.path = 'sist';
    const sistema = await this.obterSistemaPor(idSist);
    this.path = 'sist/' + sistema.id + '/problemas';
    const problemas = await super.collectionOnce$().toPromise();
    sistema.problemas = problemas;
    return sistema;
  }

  private async obterIdsSistemas() {
    this.path = 'sist';
    const sistemas = await super.collectionOnce$().toPromise();
    let ids = [];
    sistemas.forEach(sistema => ids.push(sistema.id));
    return ids;
   }

   // public async obterTodosOsSistemasComProblemas() {
   //    const idsSist = await this.obterIdsSistemas();
   //    let sistemas = [];
   //    idsSist.forEach(async idSist => sistemas.push(await this.obterSistemaComProblemas(idSist)));
   //    return sistemas;
   // }

  public async obterTodosOsSistemasComProblemas() {
    const idsSist = await this.obterIdsSistemas();
    let sistemas = [];
    for (let id of idsSist) { sistemas.push(await this.obterSistemaComProblemas(id)); }
    return sistemas;
  }

  //const obj = await super.collectionOnce$(ref => ref.doc('sist 2').collection('problemas')).toPromise()

  public async obterProblemasComSistemasSubquery() {
    this.path = 'sist';
    const idSistema = [];
    const idProblema = [];
    const obj = await super.collectionOnce$(ref => {
      idSistema.push(ref.doc('hipcow').get().then(aux =>  aux.id));
      idProblema.push(ref.doc('hipcow').collection('problemas').doc('PROB LEMA 1').get().then(test => test.id));
      return ref.doc('hipcow').collection('problemas');
    }).toPromise();
    console.log(obj);
    console.log(idSistema[0]);
    console.log(idProblema[0]);
  }

  public async problemsComSist() {
    const listaProblemas = [];
    const obj = await super.collectionOnce$(ref => {
      const problemasHipcow = ref.doc('hipcow').collection('problemas');
      const problemasSist2 = ref.doc('sist 2').collection('problemas');
      listaProblemas.push(problemasHipcow);
      listaProblemas.push(problemasSist2);
      return ref;
    }).toPromise();
    console.log(obj);
    console.log(listaProblemas)
  }

   private async pegarIdDeTodosOsSistemas() {
    const teste = await super.collectionOnce$().toPromise();
    const ids = [];
    teste.forEach(sistema => ids.push(sistema.id));
    return ids;
  }

  async pegarIdDeTodosOsProblemas() {
    const idsSistemas = await this.pegarIdDeTodosOsSistemas().then(ids => ids).catch(() => {throw new Error('não foi possível buscar os ids dos sistemas')});
    const idsProblemas = [];
    await super.collectionOnce$(ref => {
      idsSistemas.forEach(idSistema => idsProblemas.push(ref.doc(idSistema).collection('problemas').doc()));
      return ref;
    });
    console.log(idsProblemas);
  }


}

