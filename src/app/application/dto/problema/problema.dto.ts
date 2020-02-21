export class ProblemaDto {
  id: string;
  nivel: string;
  urgencia: string;

  constructor(id: string, nivel: string, urgencia: string) {
    this.id = id;
    this.nivel = nivel;
    this.urgencia = urgencia;
  }

}
