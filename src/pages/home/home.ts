import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Network]
})
export class HomePage {
  token = '';

  constructor(public navCtrl: NavController, private network: Network) {

  }

  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
  }

}
