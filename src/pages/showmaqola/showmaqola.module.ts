import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowmaqolaPage } from './showmaqola';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    ShowmaqolaPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(ShowmaqolaPage),
  ],
    entryComponents: [ShowmaqolaPage],
})
export class ShowmaqolaPageModule {}
