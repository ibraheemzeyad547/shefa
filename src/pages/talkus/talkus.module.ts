import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkusPage } from './talkus';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    TalkusPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(TalkusPage),
  ],
    entryComponents: [TalkusPage],
})
export class TalkusPageModule {}
