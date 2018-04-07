import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { RegisterPage } from '../register/register';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';
import { HomePage } from '../home/home';

@Component({
  selector:    'page-login',
  templateUrl: 'login.html',
  providers: [AuthServiceProvider]
})
export class LoginPage {
  public formData: any;
  loading:any;
  data:any;

  constructor(
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthServiceProvider
  ) {
    this.formData = { };
    this.formData.email = 'sazzad@myemail.com';
    this.formData.password = 'sazzad';
  }

  ionViewDidLoad() {
  }


  // LOGIN TASKS
  login(){


    if(this.formData.email == ''){
      this.presentToast("Email can not be empty");
    }else if(this.formData.password == ''){
    this.presentToast("Password can not be empty");
    }
    else{
      this.showLoader();

      this.authService.login(this.formData).then((result) => {
        this.loading.dismiss();
        this.data = result;
        this.presentToast("Login Successful");
        localStorage.setItem('token', this.data.access_token);

        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.loading.dismiss();
        this.presentToast("Login Failed");
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
      duration: 4000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  // GO TO FORGOT PASSWORD PAGE
  goToForgotPass(){
    this.navCtrl.push(ForgotPassPage);
  }

  // GO TO REGISTER PAGE
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}