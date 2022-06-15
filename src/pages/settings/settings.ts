import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {  ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { AppRate } from '@ionic-native/app-rate';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FormpagesProvider } from '../../providers/formpages/formpages';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    messageSher:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolatOne:any=[];
    returnDataMaqolatthre:any=[];
    returnDataMaqolatTow:any=[];
    lang:any;
    alertHealing:any;
    alertHearShow:any;
    alertHearShowUser:any;
    displayAppNameVer:any;
    titleVer:any;
    messageVer:any;
    cancelButtonLabelVer:any;
    laterButtonLabelVer:any;
    rateButtonLabelVer:any;
    constructor(private platform: Platform,private formpagesProvider:FormpagesProvider,private localNotifications: LocalNotifications,private appRate: AppRate,private storage: Storage,private socialSharing: SocialSharing,private translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,public actionsheetCtrl: ActionSheetController) {

    }
    userAppRate(){
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en") {
                    this.displayAppNameVer = "Healing of the Quran";
                    this.titleVer = "Rate healing of the Quran App";
                    this.messageVer = "Would you mind to talking moment to rate Healing of the Quran app";
                    this.cancelButtonLabelVer = "No thanks";
                    this.laterButtonLabelVer = "Remind me later";
                    this.rateButtonLabelVer = "Rate Healing of the Quran app now";
                }else{
                    this.displayAppNameVer = "شفاء القراّن";
                    this.titleVer = "قيم تطبيق شفاء القراّن";
                    this.messageVer = "هل بإمكانك أن توفر لحظة لتقييم تطبيق شفاء القراّن";
                    this.cancelButtonLabelVer = "لا شكرا";
                    this.laterButtonLabelVer = "ذكرني لاحقا";
                    this.rateButtonLabelVer = "قيم تطبيق شفاء القراّن الان";
                }
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en") {
                        this.displayAppNameVer = "Healing of the Quran";
                        this.titleVer = "Rate healing of the Quran App";
                        this.messageVer = "Would you mind to talking moment to rate Healing of the Quran app";
                        this.cancelButtonLabelVer = "No thanks";
                        this.laterButtonLabelVer = "Remind me later";
                        this.rateButtonLabelVer = "Rate Healing of the Quran app now";
                    }else{
                        this.displayAppNameVer = "شفاء القراّن";
                        this.titleVer = "قيم تطبيق شفاء القراّن";
                        this.messageVer = "هل بإمكانك أن توفر لحظة لتقييم تطبيق شفاء القراّن";
                        this.cancelButtonLabelVer = "لا شكرا";
                        this.laterButtonLabelVer = "ذكرني لاحقا";
                        this.rateButtonLabelVer = "قيم تطبيق شفاء القراّن الان";
                    }
                }
            }
        });
        this.appRate.preferences = {
            simpleMode:true,
            usesUntilPrompt: 3,
            displayAppName:this.displayAppNameVer,
            storeAppURL: {
                ios: '1490822909',
                android: 'market://details?id=shefa.healingofthequran.com',
            },
            promptAgainForEachNewVersion:true,
            customLocale:{
                title:this.titleVer,
                message:this.messageVer,
                cancelButtonLabel:this.cancelButtonLabelVer,
                laterButtonLabel:this.laterButtonLabelVer,
                rateButtonLabel:this.rateButtonLabelVer
            }
        };
        this.appRate.promptForRating(true);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }
    ngOnInit() {
        this.translate.get('alertHealing').subscribe( value => {
                this.alertHealing = value;
            }
        );
        this.translate.get('alertHearShow').subscribe( value => {
                this.alertHearShow = value;
            }
        );
        this.translate.get('alertHearShowUser').subscribe( value => {
                this.alertHearShowUser = value;
            }
        );
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en")
                    this.lang = 2;
                else
                    this.lang = 1;
            }else{
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
            this.formpagesProvider.getMaqolatNotification(this.lang,16).then(data=>{
                this.returnMaqolatData = data;
                this.responseResponseMaqolatStatus = this.returnMaqolatData.ResponseStatus;
                this.responseMaqolatData="";
                if(this.responseResponseMaqolatStatus=="success"){
                    this.responseMaqolatData = this.returnMaqolatData.Data.maqolat;
                    for(let i = 0; i < this.responseMaqolatData.length;i++){
                        this.returnDataMaqolatOne[i]=[];
                        this.returnDataMaqolatOne[i] = this.responseMaqolatData[i].maqola;
                    }
                }
            });
            this.formpagesProvider.getMaqolatNotification(this.lang,8).then(data=>{
                this.returnMaqolatData = data;
                this.responseResponseMaqolatStatus = this.returnMaqolatData.ResponseStatus;
                this.responseMaqolatData="";
                if(this.responseResponseMaqolatStatus=="success"){
                    this.responseMaqolatData = this.returnMaqolatData.Data.maqolat;
                    for(let i = 0; i < this.responseMaqolatData.length;i++){
                        this.returnDataMaqolatTow[i]=[];
                        this.returnDataMaqolatTow[i] = this.responseMaqolatData[i].maqola;
                    }
                }
            });
            this.formpagesProvider.getMaqolatNotification(this.lang,3).then(data=>{
                this.returnMaqolatData = data;
                this.responseResponseMaqolatStatus = this.returnMaqolatData.ResponseStatus;
                this.responseMaqolatData="";
                if(this.responseResponseMaqolatStatus=="success"){
                    this.responseMaqolatData = this.returnMaqolatData.Data.maqolat;
                    for(let i = 0; i < this.responseMaqolatData.length;i++){
                        this.returnDataMaqolatthre[i]=[];
                        this.returnDataMaqolatthre[i] = this.responseMaqolatData[i].maqola;
                    }
                }
            });
        });
    }
    openMenu(){
        this.navCtrl.setRoot("RoquiatimePage");
    }


    openMenu2() {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: this.translate.instant('high'),
                    role: 'destructive',
                    handler: () => {
                        this.storage.set('alertHealing', '1');
                        this.storage.get('selectedLang').then(langUse=>{
                            if(langUse!=null && langUse!=undefined && langUse!="") {
                                if (langUse == "en")
                                    this.lang = 2;
                                else
                                    this.lang = 1;
                            }else{
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
                        });

                        this.localNotifications.cancel([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]).then(()=>{
                            this.localNotifications.schedule([
                                {id:1,title:this.alertHealing,text: this.returnDataMaqolatOne[0],trigger: {every: {hour: 8,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:2,title:this.alertHealing,text: this.returnDataMaqolatOne[1],trigger: {every: {hour: 8,minute: 45}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:3,title:this.alertHealing,text: this.returnDataMaqolatOne[2],trigger: {every: {hour: 9,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:4,title:this.alertHealing,text: this.returnDataMaqolatOne[3],trigger: {every: {hour: 10,minute: 15}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:5,title:this.alertHealing,text: this.returnDataMaqolatOne[4],trigger: {every: {hour: 11,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:6,title:this.alertHealing,text: this.returnDataMaqolatOne[5],trigger: {every: {hour: 11,minute: 45}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:7,title:this.alertHealing,text: this.returnDataMaqolatOne[6],trigger: {every: {hour: 12,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:8,title:this.alertHealing,text: this.returnDataMaqolatOne[7],trigger: {every: {hour: 13,minute: 15}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:9,title:this.alertHealing,text: this.returnDataMaqolatOne[8],trigger: {every: {hour: 14,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:10,title:this.alertHealing,text: this.returnDataMaqolatOne[9],trigger: {every: {hour: 14,minute: 45}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:11,title:this.alertHealing,text: this.returnDataMaqolatOne[10],trigger: {every: {hour: 16,minute: 50}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:12,title:this.alertHealing,text: this.returnDataMaqolatOne[11],trigger: {every: {hour: 16,minute: 15}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:13,title:this.alertHealing,text: this.returnDataMaqolatOne[12],trigger: {every: {hour: 16,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:14,title:this.alertHealing,text: this.returnDataMaqolatOne[13],trigger: {every: {hour: 17,minute: 45}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:15,title:this.alertHealing,text: this.returnDataMaqolatOne[14],trigger: {every: {hour: 18,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:16,title:this.alertHealing,text: this.returnDataMaqolatOne[15],trigger: {every: {hour: 19,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                            ]);
                        });
                    }
                },
                {
                    text: this.translate.instant('average'),
                    handler: () => {
                        this.storage.set('alertHealing', '2');
                        this.localNotifications.cancel([1,2,3,4,5,6,7,8]).then(()=>{
                            this.localNotifications.schedule([
                                {id:1,title:this.alertHealing,text: this.returnDataMaqolatTow[0],trigger: {every: {hour: 8,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:2,title:this.alertHealing,text: this.returnDataMaqolatTow[1],trigger: {every: {hour: 10,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:3,title:this.alertHealing,text: this.returnDataMaqolatTow[2],trigger: {every: {hour: 12,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:4,title:this.alertHealing,text: this.returnDataMaqolatTow[3],trigger: {every: {hour: 14,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:5,title:this.alertHealing,text: this.returnDataMaqolatTow[4],trigger: {every: {hour: 16,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:6,title:this.alertHealing,text: this.returnDataMaqolatTow[5],trigger: {every: {hour: 17,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:7,title:this.alertHealing,text: this.returnDataMaqolatTow[6],trigger: {every: {hour: 18,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:8,title:this.alertHealing,text: this.returnDataMaqolatTow[7],trigger: {every: {hour: 19,minute: 30}, count:1}, led: 'FF0000',launch: true,foreground: true},
                            ]);
                        });
                    }
                },
                {
                    text: this.translate.instant('low'),
                    handler: () => {
                        this.storage.set('alertHealing', '3');

                        this.localNotifications.cancel([1,2,3]).then(()=>{
                            this.localNotifications.schedule([
                                {id:1,title:this.alertHealing,text: this.returnDataMaqolatthre[0],trigger: {every: {hour: 9,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:2,title:this.alertHealing,text: this.returnDataMaqolatthre[1],trigger: {every: {hour: 14,minute: 1}, count:1}, led: 'FF0000',launch: true,foreground: true},
                                {id:3,title:this.alertHealing,text: this.returnDataMaqolatthre[2],trigger: {every: {hour: 17,minute: 45}, count:1}, led: 'FF0000',launch: true,foreground: true},
                            ]);
                        });
                    }
                },
                {
                    text: this.translate.instant('turningOff'),
                    handler: () => {
                        this.storage.set('alertHealing', '4');
                        this.localNotifications.cancel([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    openMenu3() {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: this.translate.instant('turningOn'),
                    handler: () => {
                        this.storage.set('closeHearRead', '1');
                    }
                },
                {
                    text: this.translate.instant('turningOff'),
                    handler: () => {
                        this.storage.set('closeHearRead', '2');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    openMenu4() {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: this.translate.instant('turningOn'),
          handler: () => {
            this.storage.set('runMediaInBackgound', '1');
          }
        },
        {
          text: this.translate.instant('turningOff'),
          handler: () => {
            this.storage.set('runMediaInBackgound', '2');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
    sharingSosial(){
        this.translate.get('deploy').subscribe( value => {
                this.messageSher = value;
            }
        );
        this.platform.ready().then(() => {
            if(this.platform.is('ios')) {
                this.socialSharing.share(this.messageSher, 'Subject',"","https://play.google.com/store/apps/details?id=shefa.healingofthequran.com").then(() => {
                    // Success!
                }).catch(() => {
                    // Error!
                });
            } else if (this.platform.is('android')) {
                this.socialSharing.share(this.messageSher, 'Subject',"","https://play.google.com/store/apps/details?id=shefa.healingofthequran.com").then(() => {
                    // Success!
                }).catch(() => {
                    // Error!
                });
            } else {
                this.socialSharing.share(this.messageSher, 'Subject',"","https://play.google.com/store/apps/details?id=shefa.healingofthequran.com").then(() => {
                    // Success!
                }).catch(() => {
                    // Error!
                });
            }
        });
    }
    goBack(lang){
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
}
