import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthServiceProvider]
})
export class RegisterPage {
    formData: any;
    loading:any;
    data:any;
  constructor(
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public authService: AuthServiceProvider
    ) {
    this.formData = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  register(){


    if(this.formData.email == ''){
      this.presentToast("Email can not be empty");
    }else if(this.formData.password == ''){
    this.presentToast("Password can not be empty");
    }
    else if(this.formData.name == ''){
    this.presentToast("Name can not be empty");
    }
    else{
      this.showLoader();

      this.authService.register(this.formData).then((result) => {
        this.loading.dismiss();
        this.data = result;
       console.log("Success:" + result);
        this.presentToast("Registration Successful");
        this.navCtrl.push(LoginPage);
      }, (err) => {
        this.loading.dismiss();
        // this.presentToast(err);
        console.log("Error: " + err);
        this.presentToast("Registration Failed :(");
      });
    }
    
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
