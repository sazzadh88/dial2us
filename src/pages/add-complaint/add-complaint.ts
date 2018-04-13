import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-add-complaint',
  templateUrl: 'add-complaint.html',
  providers: [Camera]
})
export class AddComplaintPage {

  base64Image: string;



  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {

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
}
