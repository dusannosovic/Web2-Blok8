import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {NotifyService } from './notify.service';
import{HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class AuthService{

    constructor(private notifyService : NotifyService, private http: HttpClient) { }
    private getTipKorisnikaUrl : string = `http://localhost:52295/api/Account/GetUserType/`;
    logIn(response: any) : void {
        const jwt =  response.access_token;


        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let role = decodedJwtData.role
        let userId =  decodedJwtData.unique_name;

        localStorage.setItem('token', jwt)
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        let tip = '';
        this.getTipKorisnika(userId).subscribe(
            (data)=>{
                tip = data;
                if(tip != "")
            {
                localStorage.setItem('userType', tip);
            }
            }
            
        );
    }
    getTipKorisnika(username : string) : Observable<string>{
        return this.http.get<string>(this.getTipKorisnikaUrl+`${username}`);
      }

    logOut(): void {       
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
    }

    isLoggedIn(): boolean {
        if(!localStorage.getItem('jwt'))
            return false;
        else
            return true;
    }

    isAdmin(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let role = localStorage.getItem('role');
        if (role=="Admin") {
            return true;
        } else {
            return false;
        }
    }

    isKontrolor(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let role = localStorage.getItem('role');

        if (role=="Controller") {
            return true;
        } else {
            return false;
        }
    }

    isKorisnik(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let role = localStorage.getItem('role');

        if (role=="AppUser") {
            return true;
        } else {
            return false;
        }
    }
    
}

export class AuthData {
    
    token: string;
    role: string;
    id: string;

    constructor(token:string, role: string, id: string) {
        this.token = token;
        this.role = role;
        this.id = id;
     }
}