import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {FaleConoscoDto} from '../application/dto/elogio/fale-conosco.dto';


@Injectable({
  providedIn: 'root'
})
export class FaleConoscoFirestoreService extends FirestoreService<FaleConoscoDto> {
    protected path = '';

    public async criarElogio(idUser: string, dto: FaleConoscoDto) {
      this.path = 'usuarios/' + idUser + '/elogio';
      const id = super.createId();
      return await super.create$(id, {
        assunto: dto.assunto,
        mensagem: dto.mensagem
      }).toPromise();
    }

    public async criarSugestao(idUser: string, dto: FaleConoscoDto) {
      this.path = 'usuarios/' + idUser + '/sugestao';
      const id = super.createId();
      return await super.create$(id, {
        assunto: dto.assunto,
        mensagem: dto.mensagem
      }).toPromise();
    }

    public async criarReclamacao(idUser: string, dto: FaleConoscoDto) {
      this.path = 'usuarios/' + idUser + '/reclamacao';
      const id = super.createId();
      return await super.create$(id, {
        assunto: dto.assunto,
        mensagem: dto.mensagem
      });
    }
}
