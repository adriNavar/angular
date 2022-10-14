import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable()
export class LoginService {
  token: string;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token) => {
            this.token = token;
            console.log('Token:' + token);
            this.router.navigate(['/']);
          });
      }); // esto es para hacer el login
  }

  getIdToken() {
    return this.token;
  }

  isAutenticado() {
    return this.token != null;
  }

  logout(){
    firebase.auth().signOut().then(() => {
      this.token=null;
      this.router.navigate(['login']);
      console.log("Se cerro sesion con exito")
    }).catch(error => console.log("error logout:"+ error))
  }
}
