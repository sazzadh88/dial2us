import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintDetailsPage } from './complaint-details';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(ComplaintDetailsPage),
  ],
})
export class ComplaintDetailsPageModule {}
