import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AddComplaintPage } from '../add-complaint/add-complaint';
import { ComplaintDetailsPage } from '../complaint-details/complaint-details';

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
  
  constructor(public toastCtrl:ToastController, private authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
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
      console.log("Error -> " + JSON.stringify(err));
      this.loading.dismiss();
      
    });
  }

  doRefresh(refresher) {
   
    this.authService.loadComplaints(this.user_id, this.token).then((result) => {
      this.complaintList = result;
      refresher.complete();
      this.presentToast("Data loaded");
      
    }, (err) => {
      this.presentToast("Network Connection Failed");
      refresher.complete();
      
    });
  }

  complaintDetails(id){
    this.navCtrl.push(ComplaintDetailsPage,{complaint_id: id});
  }

  openAddComplaint(){
    this.navCtrl.push(AddComplaintPage);
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
