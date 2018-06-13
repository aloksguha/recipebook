import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedfeature: string = 'recipe';
  onNevigate(feature: string){
    this.loadedfeature = feature;
  }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCYfS5pmlYlrrjj4k9V7H4RVeQytfDL50Y",
      authDomain: "recipe-shopping-udemy.firebaseapp.com"
    })
  }

}
