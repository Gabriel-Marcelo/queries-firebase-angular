import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterUsuarioDto} from '../application/dto/usuario/obter-usuario.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPaginationFirestoreService extends FirestoreService<ObterUsuarioDto> {

  cont: number = 0;
  arr: any[];

  protected path = 'usuarios';

  async carregarUsuarios() {
    await super.collectionOnce$(ref => {
      ref.limit(2)
        .get().then(response => response.forEach(item => this.arr.push(item.data())));
      return ref;
    });
    console.log(this.arr);
  }

  //

   private async getNomeUsuarios() {
     const users = await super.collectionOnce$(ref => ref.limit(3).orderBy('nome').startAt(this.cont)).toPromise();
     const nomes = [];
     users.forEach(user => nomes.push(user.nome));
     return nomes;
  }

    async carregarProximos() {
      this.aux();
      //const ids = await this.getNomeUsuarios();
      const ids = [];
      return await super.collectionOnce$(ref => {
        //console.log( ids);
        ref.get().then(colecao => {
          colecao.forEach(documento => {
            ids.push(documento.data().nome);
          });
          console.log(ids);
        });

        // console.log(ids[0]);
        // console.log(ids[1]);
        //console.log(ids[0]);
        return ref.limit(6).orderBy('nome').startAfter(0);
      }).toPromise();
    }

  async aux() {
    console.log(await super.collectionOnce$(ref => ref.orderBy('nome')).toPromise());
  }

}
