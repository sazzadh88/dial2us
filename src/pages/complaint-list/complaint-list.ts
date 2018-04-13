import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { BillDetailsPage } from '../bill-details/bill-details';
import { AddComplaintPage } from '../add-complaint/add-complaint';

/**
 * Generated class for the ComplaintListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complaint-list',
  templateUrl: 'complaint-list.html',
  
})
export class ComplaintListPage {
  complaintList:any = [];
  loading:any;
  user_id:any;
  token:any;
  
  constructor(private authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    this.showLoader();
    
    let userData = JSON.parse(localStorage.getItem('user'));
   
    this.token = localStorage.getItem('token');
    this.user_id = userData.id;
    this.complaintList = this.loadComplaints(this.user_id, this.token);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading complaints...'
    });

    this.loading.present();
  }

  loadComplaints(user_id, token){
    this.authService.loadComplaints(user_id, token).then((result) => {
      this.complaintList = result;
  
      this.loading.dismiss();
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
      this.loading.dismiss();
      
    });
  }

  doRefresh(refresher) {
   
    this.authService.loadComplaints(this.user_id, this.token).then((result) => {
      this.complaintList = result;
      refresher.complete();
      
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
      refresher.complete();
      
    });
  }

  complaintDetails(id){
    this.navCtrl.setRoot(BillDetailsPage,{complaint_id: id});
  }

  openAddComplaint(){
    this.navCtrl.push(AddComplaintPage);
  }
}
