import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ConsultationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultation',
  templateUrl: 'consultation.html',
})
  export class ConsultationPage {
  nameError:any = "";
  countryError:any = "#dadada";
  emailError:any = "";
  emailCheckError:any = "";
  msgError:any = "";
    nameValue:any;
    countryValue:any;
    emailValue:any;
    messageValue:any;
    lang:any;
    returnFormData:any;
    responseResponseStatus:any;
    errorResponseStatus:any;
    responseFormData:any;
    isdisabled:boolean=true;
    constructor(private formpagesProvider:FormpagesProvider,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,private translate: TranslateService) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultationPage');
  }
    checkName(data){
        this.nameError = "";
    }
    checkCountry(data){
        this.countryError = "#dadada";
    }
    checkEmail(data){
        this.emailError = "";
        let checkVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!checkVal.test(data)){
            this.emailCheckError = "borderColor";
        }
        else{
            this.emailCheckError = "";
        }
    }
    checkMessge(data){
        this.msgError = "";
    }
    consultationForm(formData) {
        if (formData.value.name == undefined && formData.value.country == undefined && formData.value.email == undefined && formData.value.message == undefined) {
            this.nameError = "borderColor";
            this.countryError = "#c00000";
            this.emailError = "borderColor";
            this.msgError = "borderColor";
            return false;
        }
        if(formData.value.name == undefined || formData.value.name == "") {
            this.nameError = "borderColor";
            return false;
        }
        if(formData.value.country == undefined || formData.value.country == "") {
            this.countryError = "#c00000";
            this.countryError = "#c00000";
            return false;
        }
        if(formData.value.email == undefined || formData.value.email == "") {
            this.emailError = "borderColor";
            return false;
        }
        if(formData.value.message == undefined || formData.value.message == "") {
            this.msgError = "borderColor";
            return false;
        }
        this.nameValue = formData.value.name;
        this.countryValue = formData.value.country;
        this.emailValue = formData.value.email;
        this.messageValue = formData.value.message;
        this.isdisabled = false;
        this.formpagesProvider.consultation(this.nameValue,this.countryValue,this.emailValue,this.messageValue,1).then(data=>{
            this.returnFormData = data;
            this.responseResponseStatus = this.returnFormData.ResponseStatus;
            this.responseFormData="";
            if(this.responseResponseStatus=="success"){
                formData.reset();
                this.isdisabled = true;
                let toast = this.toastCtrl.create({
                    message: this.returnFormData.Data.Message,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
            else{
                formData.reset();
                this.isdisabled = true;
                let toast = this.toastCtrl.create({
                    message: this.returnFormData.Error.Message,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
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

}
