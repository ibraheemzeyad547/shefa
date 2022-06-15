import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScientificissuesPage } from './scientificissues';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    ScientificissuesPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(ScientificissuesPage),
  ],
    entryComponents: [ScientificissuesPage],
})
export class ScientificissuesPageModule {}
