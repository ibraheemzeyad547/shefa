import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoquiatalayenPage } from './roquiatalayen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    RoquiatalayenPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(RoquiatalayenPage),
  ],
    entryComponents: [RoquiatalayenPage],
})
export class RoquiatalayenPageModule {}
