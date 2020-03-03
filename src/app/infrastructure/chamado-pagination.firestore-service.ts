import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterChamadoDto} from '../application/dto/chamado/obter-chamado.dto';


@Injectable({
  providedIn: 'root'
})
export class ChamadoPaginationFirestoreService extends FirestoreService<ObterChamadoDto> {
  protected path = 'usuarios';

  tamanhoPagina = 2;
  primeiroAnterior: string;
  ultimoAnterior: string;
  numeroPaginaAtual = 0;
  previousStartAt: any[] = [];

  async obterPrimeirosChamados(idUser: string, idCliente: string) {
    this.path = 'usuarios/' + idUser + '/chamados';
    try {
      await this.aux(idUser, idCliente);
      const chamados = await super.collectionOnce$(ref => ref.limit(this.tamanhoPagina).where('cliente', '==', idCliente)
        .orderBy('descricao')).toPromise();
      this.primeiroAnterior = chamados[0].descricao;
      this.ultimoAnterior = chamados[chamados.length - 1].descricao;
      this.previousStartAt.push(this.primeiroAnterior);
      return chamados;
    } catch (e) {
      throw new Error('Não há chamados para essa loja e/ou para esse usuario');
    }
  }

  async carregarProximos(idUser: string, idCliente: string) {
    this.path = 'usuarios/' + idUser + '/chamados';
    try {
      const chamados =  await super.collectionOnce$(ref => {
        return ref.limit(this.tamanhoPagina).where('cliente', '==', idCliente).orderBy('descricao').startAfter(this.ultimoAnterior);
      }).toPromise();
      this.primeiroAnterior = chamados[0].descricao;
      this.ultimoAnterior = chamados[chamados.length - 1].descricao;
      this.numeroPaginaAtual += 1;
      this.previousStartAt.push(this.primeiroAnterior);
      return chamados;
    } catch (e) {
      throw new Error('Não há mais chamados');
    }
  }

  async carregarAnterior(idUser: string, idCliente: string) {
    this.path = 'usuarios/' + idUser + '/chamados';
    try {
      const chamados = await super.collectionOnce$(ref => {
        return ref.limit(this.tamanhoPagina)
          .where('cliente', '==', idCliente).orderBy('descricao').startAt(this.getPreviousStartAt()).endBefore(this.primeiroAnterior);
      }).toPromise();
      this.primeiroAnterior = chamados[0].descricao;
      this.ultimoAnterior = chamados[chamados.length - 1].descricao;
      this.numeroPaginaAtual -= 1;
      this.popPreviousStartAt(this.primeiroAnterior);
      return chamados;
    } catch (e) {
      throw new Error('Não há mais chamados');
    }
  }

  // Return the Doc rem where previous page will startAt
  getPreviousStartAt() {
    if (this.previousStartAt.length > (this.numeroPaginaAtual + 1)) {
      this.previousStartAt.splice(this.previousStartAt.length - 2, this.previousStartAt.length - 1);
    }
    return this.previousStartAt[this.numeroPaginaAtual - 1];
  }

  // Remove not required document
  popPreviousStartAt(previousFirstDoc) {
    this.previousStartAt.forEach(element => {
      if (previousFirstDoc === element) {
        element = null;
      }
    });
  }

  async aux(idUser: string, idCliente: string) {
    this.path = 'usuarios/' + idUser + '/chamados';
    console.log(await super.collectionOnce$(ref => ref.orderBy('descricao').where('cliente', '==', idCliente)).toPromise());
  }

}
