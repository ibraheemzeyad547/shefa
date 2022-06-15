import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { TranslateService } from '@ngx-translate/core';
import imageMapResize from 'image-map-resizer';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  lang:any;
  langNew:any;
  constructor(public translate:TranslateService,private storage: Storage,private platform: Platform,private localNotifications: LocalNotifications,public navCtrl: NavController,private media: Media) {
    this.localNotifications.on('click').subscribe(notification => {
      if(notification.text !=undefined)
        this.navCtrl.setRoot("ShowmaqolaPage",{"maqola":notification.text});
      else{
        this.navCtrl.setRoot("ShowmaqolaPage",{"maqola":"مفتاحُ الحياة الطيبة: حُسْن العمل، وحُسْن الظن بالله."});
      }
    }, err => {
    });
  }

  ionViewDidLoad() {
    imageMapResize();
  }
  goToFavoritesPage(){
    this.navCtrl.setRoot("FavoritesPage");
  }
  goToLibraryPage(){
    this.navCtrl.setRoot("LibraryPage");
  }
  goToConsultationPage(){
    this.navCtrl.setRoot("ConsultationPage");
  }
  goToGeneralroquiaPage(){
    this.navCtrl.setRoot("GeneralroquiaPage");
  }
  goToScientificissuesPage(){
    this.navCtrl.setRoot("ScientificissuesPage");
  }
  goToQuestionandanswerPage(){
    this.navCtrl.setRoot("QuestionandanswerPage");
  }
  goToRoquiatalmasPage(){
    this.navCtrl.setRoot("RoquiatalmasPage");
  }
  goToRoquiatalseherPage(){
    this.navCtrl.setRoot("RoquiatalseherPage");
  }
  goToRoquiatalayenPage(){
    this.navCtrl.setRoot("RoquiatalayenPage");
  }
  goToWerdalroquiaPage(){
    this.navCtrl.setRoot("WerdalroquiaPage");
  }
  goToRoquiatalmareadPage(){
    this.navCtrl.setRoot("RoquiatalmareadPage");
  }
}
