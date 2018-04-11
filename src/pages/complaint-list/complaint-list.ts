import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  complaintList:any;
  loading:any;
  user_id:any;
  
  constructor(private authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    this.showLoader();
    
    let userData = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    this.user_id = userData.id;
    this.complaintList = this.loadComplaints(this.user_id, token);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading complaints...'
    });

    this.loading.present();
  }

  loadComplaints(this.user_id, token){

  }

}
