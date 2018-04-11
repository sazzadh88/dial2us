import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  token = '';
  loading:any;
  username:string;
  userid:number;


  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
  
    let access_token = localStorage.getItem('token');
    this.token = access_token;
    
    let userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);

    this.username =  userData.name;
    this.userid =  userData.id;

    
    
  }



}
