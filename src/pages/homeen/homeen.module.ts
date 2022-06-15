import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeenPage } from './homeen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    HomeenPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(HomeenPage),
  ],
    entryComponents: [HomeenPage],
})
export class HomeenPageModule {}
