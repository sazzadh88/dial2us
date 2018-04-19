import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

/**
 * Generated class for the ComplaintDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complaint-details',
  templateUrl: 'complaint-details.html',
})


export class ComplaintDetailsPage {
  complaint_id:any;
  loading:any;
  token:any;
  data:any;
  imgs:any;
  constructor(private restAPI:RestServiceProvider, public toastCtrl:ToastController, public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  this.imgs = [];
  }

  ionViewDidLoad() {
    console.log("ionviewdidLoad called");
   this.loading.dismiss();
  }
  ngOnInit(){
    console.log("NgOnIt Called");
    this.token = localStorage.getItem('token');
    this.complaint_id = this.navParams.get('complaint_id');
   if(this.complaint_id == undefined || this.complaint_id == null || this.complaint_id == ''){
    this.presentToast("Please check complaint ID");
   }else{
    this.showLoader();
    this.restAPI.loadComplaintDetails(this.complaint_id,this.token).then((result) => {
        this.data = result;
        this.imgs = this.data.imgs;
    }, (err) => {
      
      console.log("Error ->" + JSON.stringify(err));
      this.presentToast("Failed");
      // this.loading.dismiss();
    });
    
   }
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading...'
    });

    this.loading.present();
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
