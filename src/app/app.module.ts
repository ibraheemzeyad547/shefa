import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio3';
//page
import { MyApp } from './app.component';
//plugin
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import {IonMarqueeModule} from "ionic-marquee";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP } from '@ionic-native/http';
import { FormpagesProvider } from '../providers/formpages/formpages';
import { DatePipe } from '@angular/common';
import { AppRate } from '@ionic-native/app-rate';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Downloader } from '@ionic-native/downloader';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MusicControls } from '@ionic-native/music-controls';
@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      IonMarqueeModule,
      IonicAudioModule.forRoot(defaultAudioProviderFactory),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      }),
    IonicStorageModule.forRoot({
      name: '_mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],

    }),
    IonicModule.forRoot(MyApp,{
          menuType: 'push',
          platforms: {
              ios: {
                  menuType: 'push',
              }
          }
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Media,
    FileTransfer,
    File,
    AndroidPermissions,
      SocialSharing,
      HTTP,
      DatePipe,
      AppRate,
      ScreenOrientation,
      LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FormpagesProvider,
      InAppBrowser,
    MusicControls,
      Downloader
  ]
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
