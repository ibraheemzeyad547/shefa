import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoquiatalmareadPage } from './roquiatalmaread';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    RoquiatalmareadPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(RoquiatalmareadPage),
  ],
    entryComponents: [RoquiatalmareadPage],
})
export class RoquiatalmareadPageModule {}
