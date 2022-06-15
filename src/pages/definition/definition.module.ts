import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefinitionPage } from './definition';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    DefinitionPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(DefinitionPage),
  ],
    entryComponents: [DefinitionPage],
})
export class DefinitionPageModule {}
