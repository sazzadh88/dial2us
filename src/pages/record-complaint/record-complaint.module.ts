import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordComplaintPage } from './record-complaint';

@NgModule({
  declarations: [
    RecordComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordComplaintPage),
  ],
})
export class RecordComplaintPageModule {}
