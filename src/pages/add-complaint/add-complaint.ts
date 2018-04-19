import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { ComplaintListPage } from '../complaint-list/complaint-list';



@IonicPage()
@Component({
  selector: 'page-add-complaint',
  templateUrl: 'add-complaint.html',
  providers: [Camera]
})
export class AddComplaintPage {

  token:any;
  userid:any;
  loading:any;

  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;


  constructor(public toastCtrl:ToastController, public alertCtrl:AlertController,public loadingCtrl:LoadingController, private restService: RestServiceProvider, private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
   

  }

  ngOnInit() {
    this.photos = [];
  }
  
  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Sure you want to delete this photo? There is NO undo!",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }


  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
    let userData = JSON.parse(localStorage.getItem('user'));;
    this.userid =  userData.id; 
  }

  takePic() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 850,
      targetHeight: 850,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      },
      err => {
        console.log(err);
      }
    );

  }

  uploadImage(){
    this._log("upload image called");
    this.showLoader();
    this.restService.uploadImageComplaint(this.photos,this.userid,this.token).then((result) => {
      
      this.loading.dismiss();
      this.presentToast("Complaint has been registered");
      this.navCtrl.push(ComplaintListPage);
      // this._log("Success ->" + JSON.stringify(result));
    }, (err) => {
      // this._log("Error ->" + JSON.stringify(err));
      this.presentToast("Error! Please try again.");
      this.navCtrl.push(ComplaintListPage);
      this.loading.dismiss();
      
    });
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Uploading...'
    });

    this.loading.present();
  }


  _log(e){
    console.log(e);
  }


}
