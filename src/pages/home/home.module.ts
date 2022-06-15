import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(HomePage),
  ],
    entryComponents: [HomePage],
})
export class HomePageModule {}
