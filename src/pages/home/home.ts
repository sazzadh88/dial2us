import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token = '';

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
  }

}
