import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { FormpagesProvider } from '../../providers/formpages/formpages';

/**
 * Generated class for the WerdalroquiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-werdalroquia',
  templateUrl: 'werdalroquia.html',
})
export class WerdalroquiaPage {
    firstside:any = "left";
    lastSide:any = "right";
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    showMore:number=0;
    showManhegPage:number=1;
    directionOfSlider:any="rtl";
    styleMoreLessText:any="seeMoreAr";
    styleTextOnImage:any="divTitle";
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    constructor(private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ScientificissuesPage');
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
                if (langUse == "en"){
                    this.lang = 2;
                    this.firstside = "left";
                    this.lastSide = "right";
                    this.showManhegPage = 0;
                    this.directionOfSlider = "ltr";
                    this.styleMoreLessText="seeMoreEn";
                    this.styleTextOnImage = "divTitleEn";
                }
                else{
                    this.lang = 1;
                    this.firstside = "right";
                    this.lastSide = "left";
                    this.showManhegPage = 1;
                    this.directionOfSlider = "rtl";
                    this.styleMoreLessText="seeMoreAr";
                    this.styleTextOnImage = "divTitle";
                }
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en"){
                        this.lang = 2;
                        this.firstside = "left";
                        this.lastSide = "right";
                        this.showManhegPage = 0;
                        this.directionOfSlider = "ltr";
                        this.styleMoreLessText="seeMoreEn";
                        this.styleTextOnImage = "divTitleEn";
                    }
                    else{
                        this.lang = 1;
                        this.firstside = "right";
                        this.lastSide = "left";
                        this.showManhegPage = 1;
                        this.directionOfSlider = "rtl";
                        this.styleMoreLessText="seeMoreAr";
                        this.styleTextOnImage = "divTitle";
                    }
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
        this.storage.get('showMoreStoreg').then(showMore=>{
            if(showMore)
                this.showMore = showMore;
        });
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
    }
    goToPageNumber(pageNumber:any){
        this.navCtrl.setRoot("WerdalroquiapagePage",{"pagId":pageNumber});
    }
    showMoreFun(num:any){
        if(num == 0){
            this.showMore = 1;
            this.storage.set('showMoreStoreg', '1');
        }
        else{
            this.showMore = 0;
            this.storage.set('showMoreStoreg', '0');
        }
    }

}
