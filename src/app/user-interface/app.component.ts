import {Component, OnInit} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {SistemaFirestoreService} from '../infrastructure/sistema.firestore-service';
import {ChamadoFirestoreService} from '../infrastructure/chamado.firestore-service';
import {UsuarioFirestoreService} from '../infrastructure/usuario.firestore-service';
import * as firebase from 'firebase';
import {UsuarioPaginationFirestoreService} from '../infrastructure/usuario-pagination.firestore-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  teste: Observable<any[]>;
  items: Observable<any[]>;
  aux: string = 'receba';
  private itemDoc: AngularFirestoreDocument;
  constructor(private readonly firestore: AngularFirestore, /*private readonly itemDoc: AngularFirestoreDocument<string>*/
              private readonly sistemaService: SistemaFirestoreService,
              private readonly chamadoService: ChamadoFirestoreService,
              private readonly usuarioService: UsuarioFirestoreService,
              private readonly usuarioPagination: UsuarioPaginationFirestoreService
  ) {}

  ngOnInit(): void {
    this.testar();

  }

   async testar() {
     const obj = await this.usuarioPagination.carregarProximos();
     console.log(obj);

   }

   async clicar() {
    this.usuarioPagination.cont += 1;
    const variavel = await this.usuarioPagination.carregarProximos();
    console.log(variavel);
   }


}
