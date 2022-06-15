import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(AboutPage),
  ],
    entryComponents: [AboutPage],
})
export class AboutPageModule {}
