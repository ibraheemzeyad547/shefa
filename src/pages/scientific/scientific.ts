import { Component,ViewChild,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { Content } from 'ionic-angular';
/**
 * Generated class for the ScientificPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scientific',
  templateUrl: 'scientific.html',
})
export class ScientificPage {
    @ViewChild(Content) content: Content;
    imageType:any = "0";
    pageNameTra:any;
    bookmarksArray:any=[];
    pageNumber:any;
    imageName = "";
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    bottomReached:any=0;
    numperOFimage:any=[];
    countOfPage:any;
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
  constructor(private formpagesProvider:FormpagesProvider,public zone: NgZone,private storage: Storage,private translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScientificPage');
  }
    ngOnInit() {
      if(this.content.getContentDimensions().scrollTop == this.content.getContentDimensions().scrollHeight - this.content.getContentDimensions().contentHeight){
        this.zone.run(()=>{
          this.bottomReached = 1;
        });
      }else{
        this.zone.run(()=>{
          this.bottomReached = 0;
        });
      }
        this.isBookMark().then(returnValue=>{
            if(returnValue)
                this.imageType = "1";
            else
                this.imageType = "0";
        });
        this.pageNumber = this.navParams.get('pagId');
        if(this.pageNumber == 1)
            this.countOfPage = 7;
        if(this.pageNumber == 2)
            this.countOfPage = 3;
        if(this.pageNumber == 3)
            this.countOfPage = 4;
        if(this.pageNumber == 4)
            this.countOfPage = 9;
        if(this.pageNumber == 5)
            this.countOfPage = 5;
        if(this.pageNumber == 6)
            this.countOfPage = 3;
        if(this.pageNumber == 7)
            this.countOfPage = 2;
        if(this.pageNumber == 8)
            this.countOfPage = 19;
        if(this.pageNumber == 9)
            this.countOfPage = 8;
        if(this.pageNumber == 10)
            this.countOfPage = 18;
        if(this.pageNumber ==11)
            this.countOfPage = 8;
        if(this.pageNumber == 12)
            this.countOfPage = 6;
        if(this.pageNumber == 13)
            this.countOfPage = 6;
        if(this.pageNumber == 14)
            this.countOfPage = 12;
        for(let i=0;i < this.countOfPage;i++){
            let j = i+1;
            this.numperOFimage[i]="assets/imgs/scientific/"+this.pageNumber+"_"+j+".jpg";
        }
        this.translate.get('scientific'+this.pageNumber).subscribe( value => {
                this.pageNameTra = value;
            }
        );
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
        this.formpagesProvider.watchList(this.pageNameTra,'1',this.pageNumber,'scientific'+this.pageNumber).then(data=>{})
    }
  detectBottom(){
    if(this.content.getContentDimensions().scrollTop == 0)
      this.zone.run(()=>{
        this.bottomReached = 0;
      });
    else if(this.content.getContentDimensions().scrollTop >= 100)
      this.zone.run(()=>{
        this.bottomReached = 1;
      });
  }
    goBack(){
        this.navCtrl.setRoot("ScientificissuesPage");
    }
    //added to bokmark
    bookMark(){
        return this.storage.get('bookMarks').then(bookmarks=>{
            if(bookmarks == null)
                bookmarks = new Array<any>();
            return bookmarks;
        });
    }
    isBookMark(){
        this.pageNumber = this.navParams.get('pagId');
        return this.bookMark().then(realEstate=>{
            for(let i = 0;i < realEstate.length;i++){
                if(realEstate[i][1] == this.pageNumber)
                    return true;
            }
            return false;
        });
    }
    addBookMark(){
        this.pageNumber = this.navParams.get('pagId');
        this.translate.get('scientific'+this.pageNumber).subscribe( value => {
                this.pageNameTra = value;
            }
        );
        this.bookmarksArray = [this.pageNameTra,this.pageNumber];
        this.bookMark().then(realEstate=>{
            realEstate.push(this.bookmarksArray);
            this.storage.set('bookMarks',realEstate);
        });
    }
    removeBookMark(){
        this.pageNumber = this.navParams.get('pagId');
        this.bookMark().then(realEstate=>{
            for(let i = 0;i < realEstate.length;i++){
                realEstate.splice(realEstate.findIndex(elm => realEstate[i][1] == this.pageNumber) ,1)
            }
            this.imageType = 0;
            this.storage.set('bookMarks',realEstate);
        });
    }
    saveBookMark(){
        this.isBookMark().then(returnValue=>{
            if(!returnValue){
                this.addBookMark();
                this.imageType = 1;
            }else
                this.imageType = 0;

        });
    }

}
