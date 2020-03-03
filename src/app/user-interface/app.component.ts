import {Component, OnInit} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {SistemaFirestoreService} from '../infrastructure/sistema.firestore-service';
import {ChamadoFirestoreService} from '../infrastructure/chamado.firestore-service';
import {UsuarioFirestoreService} from '../infrastructure/usuario.firestore-service';
import * as firebase from 'firebase';
import {UsuarioPaginationFirestoreService} from '../infrastructure/usuario-pagination.firestore-service';
import {CriarUsuarioDto} from '../application/dto/usuario/criar-usuario.dto';
import {CriarChamadoDto} from '../application/dto/chamado/criar-chamado.dto';
import {ChamadoPaginationFirestoreService} from '../infrastructure/chamado-pagination.firestore-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuario = '2aH8hGtQASb1844z542U';
  cliente = '4wF45z3PHHLC7ppWoDYT';
  private itemDoc: AngularFirestoreDocument;
  constructor(private readonly firestore: AngularFirestore, /*private readonly itemDoc: AngularFirestoreDocument<string>*/
              private readonly sistemaService: SistemaFirestoreService,
              private readonly chamadoService: ChamadoFirestoreService,
              private readonly usuarioService: UsuarioFirestoreService,
              private readonly usuarioPagination: UsuarioPaginationFirestoreService,
              private readonly chamadoPagination: ChamadoPaginationFirestoreService
  ) {}

   ngOnInit() {
      this.obterChamados();
  }

   async primeirosUsuarios() {
     const users = await this.usuarioPagination.pegarPrimeirosUsuarios();
     console.log(users);
     console.log(this.usuarioPagination.numeroPaginaAtual);
   }

   async proximosUsuarios() {
      const users = await this.usuarioPagination.carregarProximos();
      console.log(users);
      console.log(this.usuarioPagination.numeroPaginaAtual);
   }

   async voltarUsuarios() {
     const users = await this.usuarioPagination.carregarAnterior();
     console.log(users);
     console.log(this.usuarioPagination.numeroPaginaAtual);
   }

   async criarChamado() {
      await this.chamadoService.criarChamado('2aH8hGtQASb1844z542U', new CriarChamadoDto(
        'Chamado de sempre',
        'fioraViewer',
        'fiorapassword',
        'Garçom do sujinho',
        'meliodas',
        '9999999999',
        'PDV Linux',
        'Diferença de venda',
        '0',
        '1',
        '1'
      ));
   }

   async obterChamados() {
     const chamados = await this.chamadoPagination.obterPrimeirosChamados(this.usuario, this.cliente);
     console.log(chamados);
   }

  async proximosChamado() {
    const chamados = await this.chamadoPagination.carregarProximos(this.usuario, this.cliente);
    console.log(chamados);
    console.log(this.chamadoPagination.numeroPaginaAtual);
  }

  async voltarChamados() {
    const chamados = await this.chamadoPagination.carregarAnterior(this.usuario, this.cliente);
    console.log(chamados);
    console.log(this.chamadoPagination.numeroPaginaAtual);
  }


}
