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
    this.formData.name='Sazzad';
    this.formData.password='sazzad';
    this.formData.email='sazzad@myemail.com';
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
       console.log("Success:" + this.data);
        this.presentToast("Registration Successful");
        this.navCtrl.push(LoginPage);
      }, (err) => {
        this.loading.dismiss();
        this.data = err;
        this.presentToast(this.data.errors.email[0]);
      });
    }
    
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Creating account...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: false,

    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

}
