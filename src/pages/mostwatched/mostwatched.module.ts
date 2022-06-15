import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostwatchedPage } from './mostwatched';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MostwatchedPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(MostwatchedPage),
  ],
    entryComponents: [MostwatchedPage],
})
export class MostwatchedPageModule {}
