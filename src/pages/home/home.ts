import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AddComplaintPage } from '../add-complaint/add-complaint';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Network]
})
export class HomePage {
  token = '';
  loading:any;
  username:string;
  userid:number;


  constructor(private network: Network, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
    let userData = JSON.parse(localStorage.getItem('user'));
    this.username =  userData.name;
    this.userid =  userData.id; 
    this.check(); 
  }

  
  check(){

    console.log("Network Called");
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log(this.network.type);
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    
    // stop connect watch
    connectSubscription.unsubscribe();
  }

  navToAddComplaint(){
    this.navCtrl.push(AddComplaintPage);
  }


}
