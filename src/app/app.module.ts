import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BillPage } from '../pages/bill/bill';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import { BillDetailsPage } from '../pages/bill-details/bill-details';

import { ComplaintListPage } from '../pages/complaint-list/complaint-list';
import { RegisterComplaintPage } from '../pages/register-complaint/register-complaint';
import { ComplaintDetailsPage } from '../pages/complaint-details/complaint-details';

// import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    RegisterPage,
    ForgotPassPage,
    BillPage,
    BillDetailsPage,
    ComplaintListPage,
    RegisterComplaintPage,
    ComplaintDetailsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    BillPage,
    BillDetailsPage,
    ComplaintListPage,
    RegisterComplaintPage,
    ComplaintDetailsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
