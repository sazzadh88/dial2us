import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { ComplaintListPage } from '../complaint-list/complaint-list';
// import { ComplaintListPage } from '../complaint-list/complaint-list';


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
  // loaded:boolean = false;
  public complaintData:any;



  
  constructor(public alertCtrl:AlertController,private restAPI:RestServiceProvider, public toastCtrl:ToastController, public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.imgs = [];
    this.complaintData = {};
    this.complaintData.complaint = '';
    this.complaintData.date = '';
    this.complaintData.feedback = '';
    this.complaintData.status = '';

  }

  ionViewDidLoad() {
   
  }
  ngOnInit(){
    // this.showLoader("Loading...");
    console.log("NgOnIt Called");
    this.token = localStorage.getItem('token');
    this.complaint_id = this.navParams.get('complaint_id');
   if(this.complaint_id == undefined || this.complaint_id == null || this.complaint_id == ''){
    this.presentToast("Please check complaint ID");
   }else{
    this.showLoader("Loading...");
    this.restAPI.loadComplaintDetails(this.complaint_id,this.token).then((result) => {
        this.data = result;
        this.imgs = this.data.imgs;
        this.complaintData.complaint = this.data.data.complaint;
        this.complaintData.status = this.data.data.status;
        this.complaintData.feedback = this.data.data.feedback;
        this.complaintData.date = this.data.data.created_at;
        this.loading.dismiss();
    }, (err) => {
      
      console.log("Error -> 2" + JSON.stringify(err));
      this.presentToast("Failed");
      this.loading.dismiss();
    });
    
   }
   
  }
  showLoader(msg){
    this.loading = this.loadingCtrl.create({
        content: msg
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

  
  askDelete(complaint_id){
    console.log("Ask dele called");
    let alert = this.alertCtrl.create({
      title: 'Confirm delete complaint',
      message: 'Are you sure you want to permanently delete this?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Yes',
              handler: () => {
               this.deleteComplaint(complaint_id);
              }
          }
      ]
  });
  alert.present();
  }


  deleteComplaint(complaint_id){
    this.showLoader("Deleting complaint");
    this.restAPI.deleteComplaint(complaint_id,this.token).then((result) => {
      console.log("Success ->" + JSON.stringify(result));
      this.data = result;
      this.presentToast(this.data.data);
      // this.navCtrl.push(ComplaintListPage);
      this.navCtrl.push(ComplaintListPage);
      this.loading.dismiss();
    }, (err) => {
      
      console.log("Error -> 3" + JSON.stringify(err));
      this.presentToast(err.data);
      this.loading.dismiss();
      
    });
  }




}
