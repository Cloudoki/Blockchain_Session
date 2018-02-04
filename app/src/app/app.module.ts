import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { APIService } from '../providers/rest/api-service';
import { AuthorisePage } from '../pages/authorise/authorise';
import { HomePage } from '../pages/home/home';
import { ProfilesPage } from '../pages/profiles/profiles';
import { BlocksPage } from '../pages/blocks/blocks';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { MinePage, ModalContentPage } from '../pages/mine/mine';
import { BlockPage } from '../pages/block/block';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AuthorisePage,
    HomePage,
    ProfilesPage,
    ProfilePage,
    BlocksPage,
    SettingsPage,
    MinePage,
    BlockPage,
    ModalContentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthorisePage,
    HomePage,
    ProfilesPage,
    ProfilePage,
    BlocksPage,
    SettingsPage,
    MinePage,
    BlockPage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    APIService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
