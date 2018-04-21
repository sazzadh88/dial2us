import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BillPage } from '../pages/bill/bill';
import { ListPage } from '../pages/list/list';

import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import { BillDetailsPage } from '../pages/bill-details/bill-details';

import { ComplaintListPage } from '../pages/complaint-list/complaint-list';
import { RegisterComplaintPage } from '../pages/register-complaint/register-complaint';
import { ComplaintDetailsPage } from '../pages/complaint-details/complaint-details';
import { AddComplaintPage } from '../pages/add-complaint/add-complaint';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { RecordComplaintPage } from '../pages/record-complaint/record-complaint';


// import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    RegisterPage,
    ForgotPassPage,
    BillDetailsPage,
    ComplaintListPage,
    RegisterComplaintPage,
    ComplaintDetailsPage,
    BillPage,
    AddComplaintPage,
    RecordComplaintPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    IonicImageViewerModule,
    IonicImageLoader,
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
    BillDetailsPage,
    ComplaintListPage,
    RegisterComplaintPage,
    ComplaintDetailsPage,
    BillPage,
    AddComplaintPage,
    RecordComplaintPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
  ]
})
export class AppModule {}
