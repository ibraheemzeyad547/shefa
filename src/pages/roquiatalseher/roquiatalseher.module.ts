import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoquiatalseherPage } from './roquiatalseher';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    RoquiatalseherPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(RoquiatalseherPage),
  ],
    entryComponents: [RoquiatalseherPage],
})
export class RoquiatalseherPageModule {}
