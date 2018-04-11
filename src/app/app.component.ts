import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authService: AuthServiceProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let token = localStorage.getItem('token');
      
      if(token != '' && token != null){
        this.authService.checkToken(token).then((result) => {
          console.log(result);
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
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
    this.nav.setRoot(page.component);
  }

  navLogout(){
      let token = localStorage.getItem('token');
      this.authService.logout({'token': token}).then((result) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
    console.log('called');
    this.nav.push(ComplaintListPage);
  }
}
