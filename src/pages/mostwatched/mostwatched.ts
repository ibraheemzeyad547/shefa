import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { Scroll } from 'ionic-angular';
/**
 * Generated class for the MostwatchedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostwatched',
  templateUrl: 'mostwatched.html',
})
export class MostwatchedPage {
    @ViewChild('scrollWeb') scrollWeb: Scroll;
    allpages:any;
    imageType:any = "0";
    pageName:any=[];
    pageNameRe:any;
    lang:any;
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    returnWatchListData:any;
    responseResponseWatchListStatus:any;
    responseWatchListData:any;
    returnDataWatchList:any=[];
    pageNameTra:any;
    countRturnData:any = 1;
    numberOfData:any = 1;
    constructor(private formpagesProvider:FormpagesProvider,public navCtrl: NavController,private storage: Storage, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostwatchedPage');
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
        this.functionMostLesendLWatch(this.countRturnData);
    }
    functionMostLesendLWatch(countData){
        this.formpagesProvider.getALLWatchList(1,countData).then(data=>{
            this.returnWatchListData = data;
            this.responseResponseWatchListStatus = this.returnWatchListData.ResponseStatus;
            this.responseWatchListData="";
            if(this.responseResponseWatchListStatus=="success"){
                this.responseWatchListData = this.returnWatchListData.Data.watchList;
                for(let i = 0; i < this.responseWatchListData.length;i++){
                    this.translate.get(this.responseWatchListData[i].pageNameInApp).subscribe( value => {
                            this.pageNameTra = value;
                        }
                    );
                    this.returnDataWatchList[i]=[];
                    this.returnDataWatchList[i]['pageName'] = this.responseWatchListData[i].pageName;
                    this.returnDataWatchList[i]['pageNameInApp'] = this.pageNameTra;
                    this.returnDataWatchList[i]['pageNumber'] = this.responseWatchListData[i].pageNumber;
                }
                if(this.returnDataWatchList.length !=0)
                    this.countRturnData = countData+1;
                else
                    this.numberOfData = 0;
            }
        });
    }
    ngAfterViewInit() {
        if(this.scrollWeb) {
            this.scrollWeb.addScrollEventListener((ev) => {
                if ((ev.target.offsetHeight + ev.target.scrollTop) >= ev.target.scrollHeight) {
                    this.functionMostLesendLWatch(this.countRturnData);
                }
            });
        }
    }
    goToPage(pageNumber:any){
      if(pageNumber == 15)
          this.navCtrl.setRoot("GeneralroquiaPage",{"switchShow":"reading"});
        if(pageNumber == 16)
            this.navCtrl.setRoot("RoquiatalmareadPage",{"switchShow":"reading"});
        if(pageNumber >=1 && pageNumber <=14)
            this.navCtrl.setRoot("ScientificPage",{"pagId":pageNumber});
        if(pageNumber >=17 && pageNumber <=49)
            this.navCtrl.setRoot("WerdalroquiapagePage",{"pagId":pageNumber,"switchShow":"reading"});
    }
}
