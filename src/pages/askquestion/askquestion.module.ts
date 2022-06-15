import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskquestionPage } from './askquestion';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    AskquestionPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(AskquestionPage),
  ],
    entryComponents: [AskquestionPage],
})
export class AskquestionPageModule {}
