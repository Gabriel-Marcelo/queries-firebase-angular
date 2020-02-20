
export class CriarChamadoDto {
  descricao: string;
  usuarioTeamViewer: string;
  senhaTeamViewer: string;
  cliente: string;
  nomeContato: string;
  telefone: string;
  sistema: string;
  problema: string;
  idProblema: string;
  nivel: string;
  urgencia: string;


  constructor(descricao: string, usuarioTeamViewer: string, senhaTeamViewer: string, cliente: string, nomeContato: string, telefone: string, sistema: string, problema: string, idProblema: string, nivel: string, urgencia: string) {
    this.descricao = descricao;
    this.usuarioTeamViewer = usuarioTeamViewer;
    this.senhaTeamViewer = senhaTeamViewer;
    this.cliente = cliente;
    this.nomeContato = nomeContato;
    this.telefone = telefone;
    this.sistema = sistema;
    this.problema = problema;
    this.idProblema = idProblema;
    this.nivel = nivel;
    this.urgencia = urgencia;
  }

}
