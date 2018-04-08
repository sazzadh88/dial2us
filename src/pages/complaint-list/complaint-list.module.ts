import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintListPage } from './complaint-list';

@NgModule({
  declarations: [
    ComplaintListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintListPage),
  ],
})
export class ComplaintListPageModule {}
