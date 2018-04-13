import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';



import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BillPage } from '../pages/bill/bill';
import { ComplaintListPage } from '../pages/complaint-list/complaint-list';



@Component({
  templateUrl: 'app.html',
  providers: [AuthServiceProvider]
})




export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loading:any;


  constructor(public loadingCtrl:LoadingController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authService: AuthServiceProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let token = localStorage.getItem('token');
      
      if(token != '' && token != null){
        this.authService.checkToken(token).then((result) => {
          this.rootPage = HomePage;
        }, (err) => {
          console.log("not found");
          // this.nav.setRoot(LoginPage);
          this.rootPage = LoginPage;
        });
      }else{
        // console.log('not found');
        // this.nav.setRoot(LoginPage);
        this.rootPage = LoginPage;
      }
      this.statusBar.styleBlackTranslucent();
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
    this.nav.setRoot(page.component);
  }

  navLogout(){
    this.showLoader();
      let token = localStorage.getItem('token');
      this.authService.logout({'token': token}).then((result) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.loading.dismiss();
        this.nav.setRoot(LoginPage,{message: "Logged Out"});
    }, (err) => {
      console.log("Error ->");
      console.log(err);
    });
  }

  navBill(){
    this.nav.push(BillPage);
  }

  navComplaint(){
    this.nav.push(ComplaintListPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Logging you out...'
    });

    this.loading.present();
  }
}
