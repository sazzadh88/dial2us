import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the BillDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-details',
  templateUrl: 'bill-details.html',
  providers: [AuthServiceProvider]
})
export class BillDetailsPage {
bill_id:any;
loading:any;
billData:any;
  constructor(private authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.bill_id = this.navParams.get("bill_id");
    this.showLoader();
    let token = localStorage.getItem('token');
    this.loadBillDetails(this.bill_id,token);
    
    
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading bill details...'
    });

    this.loading.present();
  }

  loadBillDetails(bill_id,token){
    
    this.authService.loadBillDetails(bill_id,token).then((result) => {
      this.billData = result;
      
      this.loading.dismiss();
      
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
      this.loading.dismiss();
      
    });
  }

}
