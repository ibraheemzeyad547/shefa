import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstPage } from './first';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    FirstPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(FirstPage),
  ],
    entryComponents: [FirstPage],
})
export class FirstPageModule {}
