import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoquiatalmasPage } from './roquiatalmas';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    RoquiatalmasPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
      IonicPageModule.forChild(RoquiatalmasPage),
  ],
    entryComponents: [RoquiatalmasPage],
})
export class RoquiatalmasPageModule {}
