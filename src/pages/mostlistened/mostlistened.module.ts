import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostlistenedPage } from './mostlistened';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MostlistenedPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(MostlistenedPage),
  ],
    entryComponents: [MostlistenedPage],
})
export class MostlistenedPageModule {}
