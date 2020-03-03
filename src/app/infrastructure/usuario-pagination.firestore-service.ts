import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterUsuarioDto} from '../application/dto/usuario/obter-usuario.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPaginationFirestoreService extends FirestoreService<ObterUsuarioDto> {


  tamanhoPagina = 3;
  primeiroAnterior: string;
  ultimoAnterior: string;
  numeroPaginaAtual = 0;
  previousStartAt: any[] = [];

  protected path = 'usuarios';

    async pegarPrimeirosUsuarios() {
      this.aux();
      const users = await super.collectionOnce$(ref => ref.limit(3).orderBy('nome')).toPromise();
      this.primeiroAnterior = users[0].nome;
      this.ultimoAnterior = users[users.length - 1].nome;
      this.previousStartAt.push(this.primeiroAnterior);
      return users;
  }

    async carregarProximos() {
      try {
        const users =  await super.collectionOnce$(ref => {
          return ref.limit(this.tamanhoPagina).orderBy('nome').startAfter(this.ultimoAnterior);
        }).toPromise();
        this.primeiroAnterior = users[0].nome;
        this.ultimoAnterior = users[users.length - 1].nome;
        this.numeroPaginaAtual += 1;
        this.previousStartAt.push(this.primeiroAnterior);
        return users;
      } catch (e) {
          throw new Error('Não há mais usuários');
      }
    }

    async carregarAnterior() {
        try {
          const users = await super.collectionOnce$(ref => {
            return ref.limit(this.tamanhoPagina).orderBy('nome').startAt(this.getPreviousStartAt()).endBefore(this.primeiroAnterior);
          }).toPromise();
          this.primeiroAnterior = users[0].nome;
          this.ultimoAnterior = users[users.length - 1].nome;
          this.numeroPaginaAtual -= 1;
          this.popPreviousStartAt(this.primeiroAnterior);
          return users;
        } catch (e) {
          throw new Error('Não há mais usuários');
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

  async aux() {
    console.log(await super.collectionOnce$(ref => ref.orderBy('nome')).toPromise());
  }

}
