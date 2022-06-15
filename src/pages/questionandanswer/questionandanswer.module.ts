import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionandanswerPage } from './questionandanswer';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    QuestionandanswerPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(QuestionandanswerPage),
  ],
    entryComponents: [QuestionandanswerPage],
})
export class QuestionandanswerPageModule {}
