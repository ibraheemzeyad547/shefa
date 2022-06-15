import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WerdalroquiapagePage } from './werdalroquiapage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    WerdalroquiapagePage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(WerdalroquiapagePage),
  ],
    entryComponents: [WerdalroquiapagePage],
})
export class WerdalroquiapagePageModule {}
