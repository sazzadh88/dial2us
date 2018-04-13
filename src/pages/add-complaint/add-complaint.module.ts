import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddComplaintPage } from './add-complaint';

@NgModule({
  declarations: [
    AddComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(AddComplaintPage),
  ],
})
export class AddComplaintPageModule {}
