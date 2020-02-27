import { Component, OnInit } from '@angular/core';
import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
