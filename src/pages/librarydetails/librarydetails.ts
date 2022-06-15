import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams,ToastController,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the LibrarydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-librarydetails',
  templateUrl: 'librarydetails.html',
})
export class LibrarydetailsPage {
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    bookNumber:any;
    pageName:any;
    imageName:any;
    bookPageVer:any;
    bookEditionVer:any;
    bookyearVer:any;
    bookpriceVer:any;
    constructor(private iab: InAppBrowser,public view: ViewController,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LibraryPage');
    }
    goBack(){
        this.view.dismiss();
    }
    ngOnInit() {
        this.bookNumber = this.navParams.get('bookId');
        this.translate.get('book'+this.bookNumber).subscribe( value => {
                this.pageName = value;
            }
        );
        this.translate.get('bookPage'+this.bookNumber).subscribe( value => {
                this.bookPageVer = value;
            }
        );
        this.translate.get('bookEdition'+this.bookNumber).subscribe( value => {
                this.bookEditionVer = value;
            }
        );
        this.translate.get('bookyear'+this.bookNumber).subscribe( value => {
                this.bookyearVer = value;
            }
        );
        this.translate.get('bookprice'+this.bookNumber).subscribe( value => {
                this.bookpriceVer = value;
            }
        );
        this.imageName="assets/imgs/library/"+this.bookNumber+".jpg";
    }
    openPdfFile(link:any){
        this.bookNumber = this.navParams.get('bookId');
        let bookVal="6546154657487.pdf";
        if(this.bookNumber == 2)
            bookVal="6546154657488.pdf";
        if(this.bookNumber == 3)
            bookVal="6546154657481.pdf";
        if(this.bookNumber == 4)
            bookVal="6546154657482.pdf";
        if(this.bookNumber == 5)
            bookVal="6546154657483.pdf";
        if(this.bookNumber == 6)
            bookVal="65461546574793.pdf";
        if(this.bookNumber == 7)
            bookVal="6546154657485.pdf";
        if(this.bookNumber == 8)
            bookVal="6546154657499.pdf";
        if(this.bookNumber == 9)
            bookVal="6546154657471.pdf";
        if(this.bookNumber == 10)
            bookVal="6546154657472.pdf";
        if(this.bookNumber == 11)
            bookVal="6546154657473.pdf";
        if(this.bookNumber == 12)
            bookVal="6546154657474.pdf";
        let options: InAppBrowserOptions = {
            zoom: 'no'
        }
        let browser = this.iab.create("https://healingofthequran.com/filesbooks/"+bookVal,'_system',options);
    }

}
