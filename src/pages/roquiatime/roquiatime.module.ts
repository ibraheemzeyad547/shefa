import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoquiatimePage } from './roquiatime';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    RoquiatimePage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(RoquiatimePage),
  ],
    entryComponents: [RoquiatimePage],
})
export class RoquiatimePageModule {}
