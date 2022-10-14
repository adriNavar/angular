import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataServices {
  constructor(
    private httpCLiente: HttpClient,
    private loginService: LoginService
  ) {}

  //get de personas
  cargarPersonas() {
    const token = this.loginService.getIdToken();
    return this.httpCLiente.get(
      'https://listado-persona-5d357-default-rtdb.firebaseio.com/datos.json?auth=' +
        token
    );
  }

  //Metodo guardar personas
  guardarPersonas(personas: Persona[]) {
    const token = this.loginService.getIdToken();
    this.httpCLiente
      .put(
        'https://listado-persona-5d357-default-rtdb.firebaseio.com/datos.json?auth=' +
        token,
        personas
      )
      .subscribe(
        //el meto put se usa en lugar el post porque el post duplica los registros
        (response) => console.log('resultado guardar Personas: ' + response),
        (error) => console.log('error al guardar Personas:' + error)
      );
  }
  modificarPersona(index: number, persona: Persona) {
    const token = this.loginService.getIdToken();
    let url: string;

    url =
      'https://listado-persona-5d357-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auth=' +
      token;
    this.httpCLiente.put(url, persona).subscribe(
      (response) => console.log('resultado de modificar persona:' + response),
      (error) => console.log('Error a modificar persona:' + error)
    );
  }

  eliminarPersona(index: number) {
    const token = this.loginService.getIdToken();
    let url: string;

    url =
      'https://listado-persona-5d357-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auth=' +
      token;
    this.httpCLiente.delete(url).subscribe(
      (response) => console.log('se elimino la persona:' + response),
      (error) => console.log('Error a eliminar persona:' + error)
    );
  }
}
