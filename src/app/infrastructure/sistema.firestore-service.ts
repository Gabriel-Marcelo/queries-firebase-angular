import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SistemaFirestoreService {
  constructor(public db: AngularFirestore) {}

  test: any;

  teste() {
    this.test = this.db.collection('Sistemas').valueChanges();
    console.log(this.test);
  }

}
