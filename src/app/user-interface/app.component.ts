import {Component} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import DocumentData = firebase.firestore.DocumentData;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: Observable<any[]>;
  private itemDoc: AngularFirestoreDocument;
  constructor(private readonly firestore: AngularFirestore, /*private readonly itemDoc: AngularFirestoreDocument<string>*/) {

   // this.items = firestore.collection('Sistema').valueChanges(); //buscar todos
    //firestore.collection('Sistema').add({nome: "hipcoSystem", problemas: {descricao: "SaMerda não abre(pistolei)"}}); //adicionar um sistema com um problema

    //buscar no banco o "hipcoSystem"
    /*this.items = firestore.collection('Sistema', ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('nome', '==', "hipcoSystem");
      return query;
    }).valueChanges();*/

   //adicionando mais de um problema no sistema
  //firestore.collection('Sistema').add({nome: "Naruto", problemas: {descricao: ["não tem", "talvez tenha alguns"]}});

    //buscando pelo nome
   // this.items = firestore.collection('Sistema', ref => ref.where('nome', '==', 'Naruto')).valueChanges();

    //Buscar os items ordenados
  /*this.items = firestore.collection('Sistema', ref =>
    ref.orderBy('nome')
  ).valueChanges();*/

    //this.itemDoc = firestore.doc('nome');
    //this.items = this.firestore.collection('Sistema').valueChanges();
   // this.update('Gabriel');

    //Deletando um registro
    /*this.itemDoc = firestore.doc('Sistema/OISrvKKN47Vd3G7uYjlG');
    this.itemDoc.delete();
    this.items = firestore.collection('Sistema').valueChanges();*/
  }


}
