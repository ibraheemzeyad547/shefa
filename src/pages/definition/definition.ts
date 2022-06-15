import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DefinitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-definition',
  templateUrl: 'definition.html',
})
export class DefinitionPage {
    @ViewChild(Nav) nav: Nav;
    lang:any;
  constructor(private translate: TranslateService,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefinitionPage');
  }
    goBack(){
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en")
                    this.navCtrl.setRoot("HomeenPage");
                else
                    this.navCtrl.setRoot("HomePage");
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en")
                        this.navCtrl.setRoot("HomeenPage");
                    else
                        this.navCtrl.setRoot("HomePage");
                }
            }
        });
    }
    ngOnInit() {
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en")
                    this.lang = 2;
                else
                    this.lang = 1;
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en")
                        this.lang = 2;
                    else
                        this.lang = 1;
                }
            }
        });
    }
}


