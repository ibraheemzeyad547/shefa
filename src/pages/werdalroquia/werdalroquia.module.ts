import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WerdalroquiaPage } from './werdalroquia';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    WerdalroquiaPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(WerdalroquiaPage),
  ],
    entryComponents: [WerdalroquiaPage],
})
export class WerdalroquiaPageModule {}
