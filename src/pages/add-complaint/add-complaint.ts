import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';


@IonicPage()
@Component({
  selector: 'page-add-complaint',
  templateUrl: 'add-complaint.html',
  providers: [Camera]
})
export class AddComplaintPage {

  base64Image: string;
  token:any;
  userid:any;
  loading:any;


  constructor(public loadingCtrl:LoadingController, private restService: RestServiceProvider, private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
    let userData = JSON.parse(localStorage.getItem('user'));;
    this.userid =  userData.id; 
  }

  takePic() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
        console.log(err);
    });

  }

  uploadImage(){
    this.showLoader();
    this.restService.uploadImageComplaint(this.base64Image,this.userid,this.token).then((result) => {
      this.loading.dismiss();

    }, (err) => {
      this.loading.dismiss();
      
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Uploading...'
    });

    this.loading.present();
  }




}
