import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { App } from 'ionic-angular';
//delete from heare

import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "FirstPage";
  lang:any;
  langSelect:any = 1;
  langText:any;
  langUse:any;
  menuSide:any;
  pages: Array<{title: string, component: any}>;
  goHome:any="FirstPage";
  constructor(public appCtrl: App,private screenOrientation: ScreenOrientation,private menuCtrl: MenuController,private localNotifications: LocalNotifications,private storage: Storage,private translate: TranslateService,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.platform.pause.subscribe(e => {
      this.storage.set('flageShowFirstPage',0);
    });
    this.initializeApp();
    this.changeManueLang();
  }
  changeManueLang(lang:any = 0){
    if(lang!=0){
      if(lang=="2"){
        this.langUse = "en";
        this.translate.use('en');
      }
      else{
        this.langUse = "ar";
        this.translate.use('ar');
      }
      if (this.langUse == "en"){
        this.lang=2;
        this.pages = [
          { title: 'Definition', component: "DefinitionPage" },
          { title: 'AskQuestion', component: "AskquestionPage" },
          { title: 'AudioList', component: "AudiolibraryPage" },
          { title: 'MostListened', component: "MostlistenedPage" },
          { title: 'SharedUs', component: "SharedusPage" },
          { title: 'Librarys', component: "LibraryPage" },
          { title: 'Settings', component: "SettingsPage" },
          { title: 'About', component: "AboutPage" },
        ];
        this.translate.get('Definition').subscribe( value => {
            this.pages[0].title = value;
          }, err => {
            console.log(err);
          }
        );
        this.translate.get('AskQuestion').subscribe( value => {
            this.pages[1].title = value;
          }
        );
        this.translate.get('AudioList').subscribe( value => {
            this.pages[2].title = value;
          }
        );
        this.translate.get('MostListened').subscribe( value => {
            this.pages[3].title = value;
          }
        );
        this.translate.get('SharedUs').subscribe( value => {
            this.pages[4].title = value;
          }
        );
        this.translate.get('Librarys').subscribe( value => {
            this.pages[5].title = value;
          }
        );
        this.translate.get('Settings').subscribe( value => {
            this.pages[6].title = value;
          }
        );
        this.translate.get('About').subscribe( value => {
            this.pages[7].title = value;
          }
        );
      }
      else{
        this.lang=1;
        this.pages = [
          { title: 'Definition', component: "DefinitionPage" },
          { title: 'RequestRonsu', component: "ConsultationPage" },
          { title: 'AskQuestion', component: "AskquestionPage" },
          { title: 'Favorites', component: "FavoritesPage" },
          { title: 'AudioList', component: "AudiolibraryPage" },
          { title: 'MostWatched', component: "MostwatchedPage" },
          { title: 'MostListened', component: "MostlistenedPage" },
          { title: 'TalkUs', component: "TalkusPage" },
          { title: 'SharedUs', component: "SharedusPage" },
          { title: 'Librarys', component: "LibraryPage" },
          { title: 'Settings', component: "SettingsPage" },
          { title: 'About', component: "AboutPage" },
        ];
        this.translate.get('Definition').subscribe( value => {
            this.pages[0].title = value;
          }
        );
        this.translate.get('RequestRonsu').subscribe( value => {
            this.pages[1].title = value;
          }
        );
        this.translate.get('AskQuestion').subscribe( value => {
            this.pages[2].title = value;
          }
        );
        this.translate.get('Favorites').subscribe( value => {
            this.pages[3].title = value;
          }
        );
        this.translate.get('AudioList').subscribe( value => {
            this.pages[4].title = value;
          }
        );
        this.translate.get('MostWatched').subscribe( value => {
            this.pages[5].title = value;
          }
        );
        this.translate.get('MostListened').subscribe( value => {
            this.pages[6].title = value;
          }
        );
        this.translate.get('TalkUs').subscribe( value => {
            this.pages[7].title = value;
          }
        );
        this.translate.get('SharedUs').subscribe( value => {
            this.pages[8].title = value;
          }
        );
        this.translate.get('Librarys').subscribe( value => {
            this.pages[9].title = value;
          }
        );
        this.translate.get('Settings').subscribe( value => {
            this.pages[10].title = value;
          }
        );
        this.translate.get('About').subscribe( value => {
            this.pages[11].title = value;
          }
        );
      }
    }else{
      this.storage.get('selectedLang').then(langUse=>{
        if(langUse!=null && langUse!=undefined && langUse!=""){
          if(langUse=="en"){
            this.langUse = "en";
            this.translate.use('en');
          }
          else{
            this.langUse = "ar";
            this.translate.use('ar');
          }
        }else{
          if(this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
            //this.translate.setDefaultLang(this.translate.getBrowserLang());
            if(this.translate.getBrowserLang()=="en"){
              this.langUse = "en";
            }
            else{
              this.langUse = "ar";
            }
          } else {
            this.langUse = "ar";
          }
        }
        if (this.langUse == "en"){
          this.lang=2;
          this.pages = [
            { title: 'Definition', component: "DefinitionPage" },
            { title: 'AskQuestion', component: "AskquestionPage" },
            { title: 'AudioList', component: "AudiolibraryPage" },
            { title: 'MostListened', component: "MostlistenedPage" },
            { title: 'SharedUs', component: "SharedusPage" },
            { title: 'Librarys', component: "LibraryPage" },
            { title: 'Settings', component: "SettingsPage" },
            { title: 'About', component: "AboutPage" },
          ];
          this.translate.get('Definition').subscribe( value => {
              this.pages[0].title = value;
            }, err => {
              console.log(err);
            }
          );
          this.translate.get('AskQuestion').subscribe( value => {
              this.pages[1].title = value;
            }
          );
          this.translate.get('AudioList').subscribe( value => {
              this.pages[2].title = value;
            }
          );
          this.translate.get('MostListened').subscribe( value => {
              this.pages[3].title = value;
            }
          );
          this.translate.get('SharedUs').subscribe( value => {
              this.pages[4].title = value;
            }
          );
          this.translate.get('Librarys').subscribe( value => {
              this.pages[5].title = value;
            }
          );
          this.translate.get('Settings').subscribe( value => {
              this.pages[6].title = value;
            }
          );
          this.translate.get('About').subscribe( value => {
              this.pages[7].title = value;
            }
          );
        }
        else{
          this.lang=1;
          this.pages = [
            { title: 'Definition', component: "DefinitionPage" },
            { title: 'RequestRonsu', component: "ConsultationPage" },
            { title: 'AskQuestion', component: "AskquestionPage" },
            { title: 'Favorites', component: "FavoritesPage" },
            { title: 'AudioList', component: "AudiolibraryPage" },
            { title: 'MostWatched', component: "MostwatchedPage" },
            { title: 'MostListened', component: "MostlistenedPage" },
            { title: 'TalkUs', component: "TalkusPage" },
            { title: 'SharedUs', component: "SharedusPage" },
            { title: 'Librarys', component: "LibraryPage" },
            { title: 'Settings', component: "SettingsPage" },
            { title: 'About', component: "AboutPage" },
          ];
          this.translate.get('Definition').subscribe( value => {
              this.pages[0].title = value;
            }
          );
          this.translate.get('RequestRonsu').subscribe( value => {
              this.pages[1].title = value;
            }
          );
          this.translate.get('AskQuestion').subscribe( value => {
              this.pages[2].title = value;
            }
          );
          this.translate.get('Favorites').subscribe( value => {
              this.pages[3].title = value;
            }
          );
          this.translate.get('AudioList').subscribe( value => {
              this.pages[4].title = value;
            }
          );
          this.translate.get('MostWatched').subscribe( value => {
              this.pages[5].title = value;
            }
          );
          this.translate.get('MostListened').subscribe( value => {
              this.pages[6].title = value;
            }
          );
          this.translate.get('TalkUs').subscribe( value => {
              this.pages[7].title = value;
            }
          );
          this.translate.get('SharedUs').subscribe( value => {
              this.pages[8].title = value;
            }
          );
          this.translate.get('Librarys').subscribe( value => {
              this.pages[9].title = value;
            }
          );
          this.translate.get('Settings').subscribe( value => {
              this.pages[10].title = value;
            }
          );
          this.translate.get('About').subscribe( value => {
              this.pages[11].title = value;
            }
          );
        }
      });
    }
  }
  functionChangelang(lang){
    if(lang == 2){
      this.translate.use('en');
      this.platform.setDir('ltr',true);
      this.platform.setLang('en',true)
      this.langSelect = 1;
      this.langText = "عربي";
      this.menuSide = "left";
      this.initializeApp('en');
      this.changeManueLang(2);
      this.goHome =
        this.appCtrl.getRootNav().setRoot("HomeenPage");
    }else{
      this.translate.use('ar');
      this.platform.setDir('rtl',true);
      this.platform.setLang('ar',true)
      this.langSelect = 2;
      this.langText = "English";
      this.menuSide = "right";
      this.initializeApp('ar');
      this.changeManueLang(1);
      this.appCtrl.getRootNav().setRoot("HomePage");
    }
  }
  initializeApp(lang:any=0) {
    if(lang!=0){
      this.storage.set('selectedLang', lang);
      this.translate.use(lang);
      this.translate.setDefaultLang(lang);
      if(lang=="en"){
        this.lang = 2;
        this.platform.setDir('ltr',true);
        this.platform.setLang('en',true)
        this.langSelect = 1;
        this.langText = "عربي";
        this.menuCtrl.enable(false, 'right-menu');
        this.menuCtrl.enable(true, 'left-menu');
      }
      else{
        this.lang = 1;
        this.platform.setDir('ltr',false);
        this.platform.setDir('rtl',true);
        this.platform.setLang('ar',true)
        this.langSelect = 2;
        this.langText = "English";
        this.menuCtrl.enable(false, 'left-menu');
        this.menuCtrl.enable(true, 'right-menu');
      }
    }else{
      this.storage.get('selectedLang').then(langUse=>{
        if(langUse!=null && langUse!=undefined && langUse!=""){
          this.translate.use(langUse);
          this.translate.setDefaultLang(langUse);
          if(langUse=="en"){
            this.lang = 2;
            this.platform.setDir('ltr',true);
            this.platform.setLang('en',true)
            this.langSelect = 1;
            this.langText = "عربي";
            this.menuCtrl.enable(false, 'right-menu');
            this.menuCtrl.enable(true, 'left-menu');
          }
          else{
            this.lang = 1;
            this.platform.setDir('rtl',true);
            this.platform.setLang('ar',true)
            this.langSelect = 2;
            this.langText = "English";
            this.menuCtrl.enable(false, 'left-menu');
            this.menuCtrl.enable(true, 'right-menu');

          }
        }else{
          if(this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
            this.translate.setDefaultLang(this.translate.getBrowserLang());
            if(this.translate.getBrowserLang()=="en") {
              this.lang = 2;
              this.platform.setDir('ltr', true);
              this.platform.setLang('en',true)
              this.langSelect = 1;
              this.langText = "عربي";
              this.menuCtrl.enable(false, 'right-menu');
              this.menuCtrl.enable(true, 'left-menu');
            }
            else{
              this.lang = 1;
              this.platform.setDir('rtl',true);
              this.platform.setLang('ar',true)
              this.langSelect = 2;
              this.langText = "English";
              this.menuCtrl.enable(false, 'left-menu');
              this.menuCtrl.enable(true, 'right-menu');
            }

          } else {
            this.translate.use('ar'); // Set your language here
            this.platform.setDir('rtl',true);
            this.platform.setLang('ar',true)
            this.langSelect = 2;
            this.langText = "English";
            this.menuCtrl.enable(false, 'left-menu');
            this.menuCtrl.enable(true, 'right-menu');
          }
        }
      });
    }
    this.platform.ready().then(() => {
      this.storage.get('flageShowFirstPage').then(flageShowFirstPage=>{
        if(flageShowFirstPage!=1){
          this.storage.set('flageShowFirstPage',1);
          this.appCtrl.getRootNav().setRoot("FirstPage");
        }
      });
      this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString('#185e85');
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
