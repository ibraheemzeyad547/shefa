import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudiolibraryPage } from './audiolibrary';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    AudiolibraryPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(AudiolibraryPage),
  ],
    entryComponents: [AudiolibraryPage],
})
export class AudiolibraryPageModule {}
