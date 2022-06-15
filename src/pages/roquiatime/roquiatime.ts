import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the RoquiatimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roquiatime',
  templateUrl: 'roquiatime.html',
})
export class RoquiatimePage {
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    lang:any;
    allpages:any;
    pageName:any=[];
    hourNum:any=[];
    minuteNum:any=[];
    alertHearShow:any;
    alertHearShowUser:any;
    valj:any;
    ampmNum:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    constructor(private localNotifications: LocalNotifications,private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoquiatimePage');
  }
    ngOnInit() {
        this.translate.get('alertHearShow').subscribe( value => {
                this.alertHearShow = value;
            }
        );
        this.translate.get('alertHearShowUser').subscribe( value => {
                this.alertHearShowUser = value;
            }
        );
        this.storage.get('roquiaTime').then(roquiaTime=>{
            this.allpages ="";
            if(roquiaTime!= null)
                this.allpages = roquiaTime;
            for(let i = 0;i < this.allpages.length;i++){
            let val = this.allpages[i].split("-");
            this.hourNum[i] = val[0];
            if(val[0]>12)
                this.hourNum[i] = val[0]-12;
            this.minuteNum[i]= val[1];
            this.ampmNum[i]= val[2];
              this.valj=val[0]+val[1]+17;
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                let day = new Date().getDate();
                let timeCalculate = new Date(year, month, day, val[0], val[1], 0, 0);
                this.localNotifications.cancel([this.valj]).then(()=>{
                    this.localNotifications.schedule([
                        {id:this.valj,title:this.alertHearShow,text: this.alertHearShowUser,trigger: {every: {hour: timeCalculate.getHours(),minute: timeCalculate.getMinutes()}, count:1}, led: 'FF0000'},
                    ]);
                });
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
    goBack(){
        this.navCtrl.setRoot("SettingsPage");
    }
    addTimeMark(){
        return this.storage.get('roquiaTime').then(timemarks=>{
            if(timemarks == null)
                timemarks = new Array<any>();
            return timemarks;
        });
    }
    isAddTimeMark(time:any){
        return this.addTimeMark().then(timestate=>{
            for(let i = 0;i < timestate.length;i++){
                if(timestate[i] == time)
                    return true;
            }
            return false;
        });
    }
    removeTimeMark(index:any,num:any){
        this.addTimeMark().then(realVal=>{
            for(let i = 0;i < realVal.length;i++){
                realVal.splice(realVal.findIndex(elm => realVal[i] == index) ,1);
            }
            this.storage.set('roquiaTime',realVal);
            let val = index.split("-");
            this.valj=val[0]+val[1]+17;
            this.localNotifications.cancel([this.valj]).then(()=>{});
            this.pageName[num]='0';
        });
    }
    addTimeToMark(time:any){
        this.addTimeMark().then(timestate=>{
            timestate.push(time);
            this.storage.set('roquiaTime',timestate);
            let val = time.split("-");
            this.valj=val[0]+val[1]+17;
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            let day = new Date().getDate();
            let timeCalculate = new Date(year, month, day, val[0], val[1], 0, 0);
            this.localNotifications.cancel([this.valj]).then(()=>{
                this.localNotifications.schedule([
                    {id:this.valj,title:this.alertHearShow,text: this.alertHearShowUser,trigger: {every: {hour: timeCalculate.getHours(),minute: timeCalculate.getMinutes()}, count:1}, led: 'FF0000'},
                ]);
            });
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    }
    saveBookMark(time){
      let val = time['hour']+"-"+time['minute']+"-"+time['ampm'];
        this.isAddTimeMark(val).then(returnValue=>{
            if(!returnValue){
                this.addTimeToMark(val);
            }
        });
    }
}
