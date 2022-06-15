import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedusPage } from './sharedus';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    SharedusPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(SharedusPage),
  ],
    entryComponents: [SharedusPage],
})
export class SharedusPageModule {}
