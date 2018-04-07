import { Http,Headers } from '@angular/http';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://localhost:8000/api/';


@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    // console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            // this.isLoggedIn = true;
          }, (err) => {
            reject(err);
          });
    });
  }
  register(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        this.http.post(apiUrl+'register', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            
          }, (err) => {
            reject(err.json());
           
          });
    });
  }

  checkToken(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(apiUrl+'me?token='+token , {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err.json());
        });
  });
  }

}
