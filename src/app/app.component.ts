import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titulo = 'Listado de personas';
  // personas: Persona[] = [];

    constructor(private loginServer:LoginService){}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYVccVt6TKzF3MuAZpmhqpTIkcmvjZykw',
      authDomain: 'listado-persona-5d357.firebaseapp.com',
    });
  }

  isAutenticado(){
  return this.loginServer.isAutenticado();
  }
  salir(){
this.loginServer.logout();
  }
}
