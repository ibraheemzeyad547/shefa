import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
    allpages:any;
    imageType:any = "0";
    pageName:any=[];
    pageNameRe:any;
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
  constructor(private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
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
        this.storage.get('bookMarks').then(bookmarks=>{
            this.allpages ="";
            if(bookmarks!= null)
                this.allpages = bookmarks;
            for(let i = 0;i < this.allpages.length;i++){
                this.pageName[i]='1';
            }
        });
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
    goToPage(index:any){
        if(index==15)
            this.navCtrl.setRoot("GeneralroquiaPage",{"switchShow":"reading"});
        if(index==16)
            this.navCtrl.setRoot("RoquiatalmareadPage",{"switchShow":"reading"});
        if(index >=1 && index <=14)
            this.navCtrl.setRoot("ScientificPage",{"pagId":index});
        if(index >=17 && index <=49){
            let pageNumber = index-16;
            this.navCtrl.setRoot("WerdalroquiapagePage",{"pagId":pageNumber});
        }

    }
    bookMark(){
        return this.storage.get('bookMarks').then(bookmarks=>{
            if(bookmarks == null)
                bookmarks = new Array<any>();
            return bookmarks;
        });
    }
    removeBookMark(index:any,num:any){
        this.bookMark().then(realVal=>{
            for(let i = 0;i < realVal.length;i++){
                this.pageNameRe=realVal[i][0];
                realVal.splice(realVal.findIndex(elm => realVal[i][1] == index) ,1);
            }
            this.imageType = 0;
            this.storage.set('bookMarks',realVal);
            this.pageName[num]='0';
            let toast = this.toastCtrl.create({
                message: this.translate.instant('removeFirst')+" "+this.pageNameRe+" "+this.translate.instant('removeSecond'),
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        });
    }
}
