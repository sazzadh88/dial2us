import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { BillDetailsPage } from '../bill-details/bill-details';

/**
 * Generated class for the BillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
  providers: [AuthServiceProvider]
})
export class BillPage {
  bills:any;

  loading:any;
  user_id:any;

  constructor(private authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader();
    
    let userData = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    this.user_id = userData.id;
    this.bills = this.loadBill(token);
   
  }

  loadBill(token){
    
    this.authService.getUserBill(this.user_id, token).then((result) => {
      this.bills = result;
  
      this.loading.dismiss();
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
      this.loading.dismiss();
      
    });
  }
  openBill(billid){
    this.navCtrl.push(BillDetailsPage,{
      'bill_id':billid
    })
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading bills...'
    });

    this.loading.present();
  }



}




