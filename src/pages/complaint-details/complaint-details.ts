import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.complaint_id = this.navParams.get('complaint_id');
   if(this.complaint_id == undefined || this.complaint_id == null || this.complaint_id == ''){
    console.log("Empty Cid");
   }else{
     console.log("Complaint Id " + this.complaint_id);
   }
  }

}
