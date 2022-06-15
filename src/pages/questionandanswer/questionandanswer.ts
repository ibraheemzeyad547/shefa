import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { FormpagesProvider } from '../../providers/formpages/formpages';
/**
 * Generated class for the QuestionandanswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionandanswer',
  templateUrl: 'questionandanswer.html',
    animations: [
        trigger('visibilityAnswer', [
            state('block', style({
                display: 'block',
                opacity: 1
            })),
            state('none', style({
                display: 'none',
                opacity: 0
            })),
            transition('* => *', animate('0.5s'))
        ])
    ]
})
export class QuestionandanswerPage {
    clickShowAnwer:any=[];
    lang:any;
    returnPageData:any;
    responseResponseStatus:any;
    responsePageData:any;
    returnDataPage:any = [];
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    numberOfData:any = 1;
  constructor(private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {

  }
    ngOnInit() {
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en")
                    this.lang = 2;
                else
                    this.lang = 1;
                this.formpagesProvider.getALLQuestions(this.lang).then(data=>{
                    this.returnPageData = data;
                    console.log(this.returnPageData)
                    this.responseResponseStatus = this.returnPageData.ResponseStatus;
                    this.responsePageData="";
                    if(this.responseResponseStatus=="success"){
                        this.responsePageData = this.returnPageData.Data.questions;
                        for(let i = 0; i < this.responsePageData.length;i++){
                            this.clickShowAnwer[i]='none';
                            this.returnDataPage[i]=[];
                            this.returnDataPage[i]['question'] = this.responsePageData[i].question;
                            this.returnDataPage[i]['answer'] = this.responsePageData[i].answer;
                            this.returnDataPage[i]['dateAdd'] = this.responsePageData[i].dateAdd;
                            this.returnDataPage[i]['isnew'] = this.responsePageData[i].isnew;
                        }
                        if( this.clickShowAnwer.length ==0)
                            this.numberOfData = 0;
                    }
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
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en")
                        this.lang = 2;
                    else
                        this.lang = 1;
                    this.formpagesProvider.getALLQuestions(this.lang).then(data=>{
                        this.returnPageData = data;
                        this.responseResponseStatus = this.returnPageData.ResponseStatus;
                        this.responsePageData="";
                        if(this.responseResponseStatus=="success"){
                            this.responsePageData = this.returnPageData.Data.questions;
                            for(let i = 0; i < this.responsePageData.length;i++){
                                this.clickShowAnwer[i]='none';
                                this.returnDataPage[i]=[];
                                this.returnDataPage[i]['question'] = this.responsePageData[i].question;
                                this.returnDataPage[i]['answer'] = this.responsePageData[i].answer;
                                this.returnDataPage[i]['dateAdd'] = this.responsePageData[i].dateAdd;
                                this.returnDataPage[i]['isnew'] = this.responsePageData[i].isnew;
                            }
                        }
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
            }
        });
    }
      ionViewDidLoad() {
        console.log('ionViewDidLoad QuestionandanswerPage');
      }
    showAnswer(i:any,type:any){
      for(let i = 0;i < this.returnDataPage.length;i++){
          this.clickShowAnwer[i]='none';
      }
      if(type=="block"){
          this.clickShowAnwer[i] = 'none';
      }else{
          this.clickShowAnwer[i] = 'block';
      }
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
    askquestionPage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.setRoot("AskquestionPage");
    }
}
