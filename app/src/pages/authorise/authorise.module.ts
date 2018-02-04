import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorisePage } from './authorise';

@NgModule({
  declarations: [
    AuthorisePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorisePage),
  ],
})
export class AuthorisePageModule {}
