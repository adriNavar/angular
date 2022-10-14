import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ignoreElements, Observable } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable()

export class LoginGuardian implements CanActivate{
  constructor(private loginService:LoginService,
              private router:Router){}

  // Es para controlar que estee logeado o no, y que no pueda acceder por url a alguna vista sin que estee logeado
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.loginService.isAutenticado()){
        return true;
      }
      else{
        this.router.navigate(['login']);
        return false;
      }
  }
  }


