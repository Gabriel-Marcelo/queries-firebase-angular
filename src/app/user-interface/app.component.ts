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
import {AlterarUsuarioDto} from '../application/dto/alterar-usuario.dto';
import {LojaFirestoreService} from '../infrastructure/loja.firestore-service';


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
              private readonly usuarioService: UsuarioFirestoreService,
              private readonly  lojaService: LojaFirestoreService
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
   // this.items = firestore.collection('Sistema', ref => ref.where('nome', '==', 'Naruto')).valueChanges();

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
  /*this.chamadoService.criarChamado(new CriarChamadoDto(
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
    "Gabriel",
    "gabriel",
    "cliente",
    "11980612356",
    "gabriel@gabriel.com",
    ["123","456"]
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

  ngOnInit(): void {
    this.testar();
  }

  async testar() {
    const obj = await this.chamadoService.obterChamados('4OC3OuhTiqkyC9DsMRef');
    console.log(obj);
  }

}
