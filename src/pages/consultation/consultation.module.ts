import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultationPage } from './consultation';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    ConsultationPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(ConsultationPage),
  ],
    entryComponents: [ConsultationPage],
})
export class ConsultationPageModule {}
