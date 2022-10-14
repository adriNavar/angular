import { LoggingService } from '../../LoggingService.service';
import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers:[LoggingService]
})
export class FormularioComponent implements OnInit {


 nombreInput: string='';
 apellidoInput: string='';
 index:number;
 modoEdicion:number ;
  // @ViewChild('nombreInput') nombreInput:ElementRef;
  // @ViewChild('apellidoInput') apellidoInput:ElementRef;

constructor(private loggingService:LoggingService,
            private personasService: PersonasService,
            private router:Router,
            private route:ActivatedRoute)
   {
    this.personasService.saludar.subscribe((indice:number)=> alert("El indice es: "+ indice));

}
  ngOnInit() {
    this.index=this.route.snapshot.params['id'];
    this.modoEdicion=+this.route.snapshot.queryParams['modoEdicion'];// con el simbolo + convierto el string a number

    if(this.modoEdicion !=null && this.modoEdicion===1){
    let persona: Persona= this.personasService.encontrarPersona(this.index);
    this.nombreInput = persona.nombre;
    this.apellidoInput = persona.apellido;
  }
  }

  onGuardarPersona(){
    let persona1= new Persona(this.nombreInput,this.apellidoInput);
    // this.loggingService.enviaMensaje("Enviamos persona: " + persona1.nombre+ " apellido: "+persona1.apellido);
    // this.personaCreada.emit(persona1);
    if (this.modoEdicion !=null && this.modoEdicion===1){ //modo 1 es edicion 0 es agregar
      this.personasService.modificarPersona(this.index,persona1);
    }
    else{
      this.personasService.agregarPersona(persona1);
    }
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index !=null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }

}
