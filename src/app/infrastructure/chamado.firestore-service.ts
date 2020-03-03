import {Injectable} from '@angular/core';
import {FirestoreService} from '@ngxs-labs/firestore-plugin';
import {ObterChamadoDto} from '../application/dto/chamado/obter-chamado.dto';
import {CriarChamadoDto} from '../application/dto/chamado/criar-chamado.dto';

@Injectable({
  providedIn: 'root'
})
export class ChamadoFirestoreService extends FirestoreService<ObterChamadoDto> {

  protected path = 'usuarios/4OC3OuhTiqkyC9DsMRef/chamados';

  async obterChamados(idUsuario: string): Promise<ObterChamadoDto[]> {
    this.path = 'usuarios/' + idUsuario + '/chamados';
    return await super.collectionOnce$().toPromise();
  }

  async criarChamado(idUsuario: string, dto: CriarChamadoDto) {
    this.path = 'usuarios/' + idUsuario + '/chamados';
    const id = super.createId();
    return await super.create$(id, {
      id: id,
      descricao: dto.descricao,
      usuarioTeamViewer: dto.usuarioTeamViewer,
      senhaTeamViewer: dto.senhaTeamViewer,
      cliente: dto.senhaTeamViewer,
      nomeContato: dto.nomeContato,
      telefone: dto.telefone,
      sistema: dto.sistema,
      problema: dto.problema,
      idProblema: dto.idProblema,
      nivel: dto.nivel,
      urgencia: dto.urgencia
    }).toPromise();
  }

}
