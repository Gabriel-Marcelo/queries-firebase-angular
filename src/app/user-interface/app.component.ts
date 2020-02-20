import {Component, OnInit} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import DocumentData = firebase.firestore.DocumentData;
import {tap} from 'rxjs/operators';
import {SistemaFirestoreService} from '../infrastructure/sistema.firestore-service';
import {ChamadoFirestoreService} from '../infrastructure/chamado.firestore-service';
import {CriarChamadoDto} from '../application/dto/criar-chamado.dto';
import {UsuarioFirestoreService} from '../infrastructure/usuario.firestore-service';
import {CriarUsuarioDto} from '../application/dto/criar-usuario.dto';
import {environment} from '../../environments/environment.prod';
import * as firebase from 'firebase';
import {CadastrarUsuarioDto} from '../application/dto/cadastrar-usuario.dto';
import {AlterarUsuarioDto} from '../application/dto/alterar-usuario.dto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  items: Observable<any[]>;
  private itemDoc: AngularFirestoreDocument;
  constructor(private readonly firestore: AngularFirestore, /*private readonly itemDoc: AngularFirestoreDocument<string>*/
              private readonly sistemaService: SistemaFirestoreService,
              private readonly chamadoService: ChamadoFirestoreService,
              private readonly usuarioService: UsuarioFirestoreService
  ) {

   // this.items = firestore.collection('sistemas').valueChanges(); //buscar todos
   // firestore.collection('Sistema').add({nome: "hipcoSystem", problemas: {descricao: "SaMerda não abre(pistolei)"}}); //adicionar um sistema com um problema

    // buscar no banco o "hipcoSystem"
    /*this.items = firestore.collection('Sistema', ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('nome', '==', "hipcoSystem");
      return query;
    }).valueChanges();*/

   // adicionando mais de um problema no sistema
  /* const promise = firestore.collection('sistemas').add({nome: 'Naruto'});
   promise.then(ref => {
    ref.collection('problemas').add({ descricao: 'Problema 1' });
    ref.collection('problemas').add({ descricao: 'Problema 2' });
    ref.collection('problemas').add({ descricao: 'Problema 3' });
  });*/

    // buscando pelo nome
    //this.items = firestore.collection('Sistema', ref => ref.where('nome', '==', 'Naruto')).valueChanges();

    // Buscar os items ordenados
  /*this.items = firestore.collection('Sistema', ref =>
    ref.orderBy('nome')
  ).valueChanges();*/

    // this.itemDoc = firestore.doc('nome');
    // this.items = this.firestore.collection('Sistema').valueChanges();
   // this.update('Gabriel');

    // Deletando um registro
   /* this.itemDoc = firestore.doc('Sistema/Dn6juw87FcSqxTEzdnvn');
    this.itemDoc.update({nome: "Susano"})
    this.items = firestore.collection('Sistema').valueChanges();*/


   /*firestore.collection('Sistema').add({nome: "Asta"});
   this.items = firestore.collection('Sistema', ref => {
     ref.where('nome', '==', 'Asta')
   });

   this.items.pipe(
     tap((obj) => {
       obj.push({problemas: "oila"})
       obj.push({problemas: "lala"})
     })
   );*/

   /*firestore.collection('Sistema').add({nome: "HelloWorld"});

   firestore.collection('Sistema/Problemas').add({descricao: "legal"});*/


  //O chamado está sendo criado
  /*this.chamadoService.criarChamado('CArgQ6dwKYgBhjqdK3ue',new CriarChamadoDto(
    "descricao 1",
    "user",
    "senhaUser",
    "Daniel",
    "Gabriel",
    "980676966",
    "PDV Linux",
    "num sei"
  ));*/

  //Obtendo chamados
  /*const obj = this.chamadoService.obterChamados();
  console.log(obj);*/

  //Obter usuarios
  /*const obj = this.usuarioService.obterUsuarios();
  console.log(obj);*/

  //Criando um usuário
  /*this.usuarioService.criarUsuario(new CriarUsuarioDto(
    "Feston",
    "feston",
    "cliente",
    "11980612356",
    "feston@feston.com",
    ["rjFOgqwXCXtJ5Q387Ysz"]
  ));*/

  //Alterando usuário
    /*this.usuarioService.alterarUsuario("4OC3OuhTiqkyC9DsMRef", new AlterarUsuarioDto(
      "Eliete",
      "eliete123",
      "Administrador",
      "1199999999",
      "eliete@eliete.com.br",
      ["123", "456"]
    ));*/

    //Removendo usuário com sucesso
    /*this.usuarioService.removerUsuario('ayy4MwoNYwBccs0f09it');*/
  }

  //obj: unknown[];

  ngOnInit(): void {
    this.testar();
    //this.usuarioService.obterUsuariosComLojas();
    //this.usuarioService.obterUsuariosComChamados();
   // / console.log(this.usuarioService.obterUsuarios());
  }

   async testar() {
  //   //const obj = await this.chamadoService.obterChamados('4OC3OuhTiqkyC9DsMRef');
  //   //const obj = await this.usuarioService.obterUsuarios();
  //   /*const obj =  await this.firestore.collection('usuarios', ref =>
  //     ref.where('nome', '==', 'Eliete')
  //   );*/
  //    const obj = await  this.usuarioService.obterIdLojasDoUsuario('4OC3OuhTiqkyC9DsMRef')
  //     console.log(obj);
     //MOSTRAR PRO ALEXIS
     // const obj = await this.usuarioService.obterUsuarioComLojas('4OC3OuhTiqkyC9DsMRef');
     // console.log(obj);
     // this.usuarioService.cadastrando(new CriarUsuarioDto(
     //   "Vania",
     //   "Cliente",
     //   "11980677889",
     //   "vania@vania.com.br",
     //   ["Xlvjq85AYfnQwoU0iSFG"],
     //    "12345655"
     // ))
     // this.usuarioService.alterarUsuario('CArgQ6dwKYgBhjqdK3ue', new AlterarUsuarioDto(
     //   "55555",
     //   ['Xlvjq85AYfnQwoU0iSFG', 'rjFOgqwXCXtJ5Q387Ysz'],
     //   "Edmilson",
     //   "Supervisor"
     // ))
     /*await this.usuarioService.alterarUsuario('wgzK3h7w6fHrmJ83uUbV', new AlterarUsuarioDto(
       "555555555",
       ""
     ))*/
     //console.log(firebase.auth().currentUser);

     //await this.usuarioService.removerUsuario('4OC3OuhTiqkyC9DsMRef');

  //
  //   const obj2 = await this.lojaService.obterLojas();
  //   console.log(obj2);
  //
  //   const obj3 = await this.lojaService.obterLojasPorIdUsuario('789');
  //   console.log(obj3);



   }




}
