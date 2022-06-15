import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralroquiaPage } from './generalroquia';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    GeneralroquiaPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(GeneralroquiaPage),
  ],
    entryComponents: [GeneralroquiaPage],
})
export class GeneralroquiaPageModule {}
