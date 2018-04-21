import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://dial.dial2us.com/api/';

@Injectable()
export class RestServiceProvider {
  
  constructor(public http: Http) {
   
  }
  uploadAudio(file){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', 'Bearer '+ token);
      this.http.post(apiUrl+'record',{'file':file}, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  loadComplaintDetails(complaint_id, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);
      this.http.get(apiUrl+'complaintdetails/'+complaint_id, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }

  deleteComplaint(complaint_id,token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);
      this.http.post(apiUrl+'complaintdelete',{'complaint_id':complaint_id}, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }


  uploadImageComplaint(imgData, user_id, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);
      this.http.post(apiUrl+'upload',  { 'user_id' : user_id , 'img' : imgData  } , {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
  }
}
