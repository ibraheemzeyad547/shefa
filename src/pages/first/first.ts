import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import imageMapResize from 'image-map-resizer';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

    constructor(public translate:TranslateService,private storage: Storage,public navCtrl: NavController) {
  }

    ngOnInit() {
        this.storage.set('flageShowFirstPage',1);
        this.storage.get('selectedLang').then(langUse => {
            if (langUse != null && langUse != undefined && langUse != "") {
                if(langUse == "en")
                  setTimeout(() => {this.navCtrl.setRoot("HomeenPage");}, 3500);
                else
                setTimeout(() => {this.navCtrl.setRoot("HomePage");}, 3500);
            } else {
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en")
                    setTimeout(() => {this.navCtrl.setRoot("HomeenPage");}, 3500);
                    else
                      setTimeout(() => {this.navCtrl.setRoot("HomePage");}, 3500);
                }
            }
        });
    }

}
