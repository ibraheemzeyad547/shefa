import { Component,ViewChild } from '@angular/core';
import { Nav,ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { HomeenPage } from '../homeen/homeen';
/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    constructor(public modalCtrl: ModalController,private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }
    goBack(){
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en")
                    this.navCtrl.setRoot(HomeenPage);
                else
                    this.navCtrl.setRoot(HomePage);
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en")
                        this.navCtrl.setRoot(HomeenPage);
                    else
                        this.navCtrl.setRoot(HomePage);
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
            this.formpagesProvider.getALLMaqolat(this.lang).then(data=>{
                this.showAllALLMaqolat="block";
                if(this.lang==2)
                    this.showAllALLMaqolat="none";
                this.returnMaqolatData = data;
                this.responseResponseMaqolatStatus = this.returnMaqolatData.ResponseStatus;
                this.responseMaqolatData="";
                if(this.responseResponseMaqolatStatus=="success"){
                    this.responseMaqolatData = this.returnMaqolatData.Data.maqolat;
                    let count=0;
                    this.forAllALLMaqolat="";
                    for(let i = 0; i < this.responseMaqolatData.length;i++){
                        if(this.responseMaqolatData[i].maqola != undefined){
                            if(count==this.responseMaqolatData.length)
                                this.forAllALLMaqolat = this.forAllALLMaqolat+this.responseMaqolatData[i].maqola;
                            else
                                this.forAllALLMaqolat = this.forAllALLMaqolat+this.responseMaqolatData[i].maqola+" | ";
                        }
                        count++;

                    }
                }
            })
        });
    }
    openModelPage(bookId:any){
        let myModel = this.modalCtrl.create("LibrarydetailsPage", {"bookId":bookId});
        myModel.present();
    }
}
