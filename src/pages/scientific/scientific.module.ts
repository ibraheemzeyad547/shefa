import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScientificPage } from './scientific';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    ScientificPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(ScientificPage),
  ],
    entryComponents: [ScientificPage],
})
export class ScientificPageModule {}
