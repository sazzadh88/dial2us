import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RecordComplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record-complaint',
  templateUrl: 'record-complaint.html',
})
export class RecordComplaintPage {

  recordStatus:boolean;

  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.recordStatus = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordComplaintPage');
  }

  startRecord(){
    this.showPrompt();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Recording..',
      message: "Please record your complaint then press Upload",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Upload',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}


