import { Http,Headers } from '@angular/http';
import { Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://dial.dial2us.com/api/';


@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
  }

  loadComplaints(user_id, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);
      this.http.post(apiUrl+'complaints',  { 'user_id' : user_id } , {headers: headers})
        .subscribe(res => {
          resolve(res.json());
          // this.isLoggedIn = true;
        }, (err) => {
          reject(err);
        });
  });
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

  getUserBill(data, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      headers.append('Authorization', 'Bearer '+ token);

     

      this.http.post(apiUrl+'bills', { 'user_id' : data }, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err.json());
        });
  });
  }
//get bill details from bill id
  loadBillDetails(bill_id,token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      headers.append('Authorization', 'Bearer '+ token);

     

      this.http.post(apiUrl+'billdetails', { 'bill_id' : bill_id }, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err.json());
        });
  });
  }

  logout(token){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        this.http.post(apiUrl+'logout',token, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            
          }, (err) => {
            reject(err.json());
           
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
