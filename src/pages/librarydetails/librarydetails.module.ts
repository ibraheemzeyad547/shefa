import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibrarydetailsPage } from './librarydetails';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    LibrarydetailsPage,
  ],
  imports: [
      TranslateModule,
      IonicStorageModule,
    IonicPageModule.forChild(LibrarydetailsPage),
  ],
    entryComponents: [LibrarydetailsPage],
})
export class LibrarydetailsPageModule {}
