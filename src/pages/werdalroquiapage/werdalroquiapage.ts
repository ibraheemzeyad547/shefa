import { Component,ViewChild,NgZone } from '@angular/core';
import { IonicPage,NavController, LoadingController, Platform, ToastController,NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { Content } from 'ionic-angular';
import {  ActionSheetController } from 'ionic-angular';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader';
import { MusicControls } from '@ionic-native/music-controls';
/**
 * Generated class for the WerdalroquiapagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-werdalroquiapage',
  templateUrl: 'werdalroquiapage.html',
})
export class WerdalroquiapagePage {
    @ViewChild(Content) content: Content;
    curr_playing_file: MediaObject[]=[];
    is_playing:any=[];
    is_in_play:any=[];
    is_ready:any=[];
    message: any;
    duration:any=[];
    position:any=[];
    get_duration_interval:any=[];
    get_position_interval:any=[];
    fullStorageDirectory:any=[];

    storageDirectory: any;
    selectSegment: string = "reading";
    showReadOrWrite:number = 1;
    changeColor:any= "contentReading";
    bottomReached:any=0;
    currentIndex: number = -1;
    repeatNumber:any=[];
    changeDirection:number = 2;
    switchDataMore:any;
    imageType:any = "0";
    pageNameTra:any;
    bookmarksArray:any=[];
    switchShow:any;
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    imageSoundType:any = "0";
    bookmarksSoundArray:any=[];
    bookmarksRepeted:any;
    pageNumber:any;
    numperOFimage:any=[];
    countOfPage:any;
    directionOfSlider:any="ltr";
    soundOfArray:any=[];
    redingType:any;
    lightButton:any=1;
    allpath:any;
    showPlayButtonType:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    loadding:any;
    typeDevice:any;
    constructor(public musicControls: MusicControls,private downloader: Downloader,private formpagesProvider:FormpagesProvider,public actionsheetCtrl: ActionSheetController,public zone: NgZone,private translate: TranslateService,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private platform: Platform, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private file: File,private transfer: FileTransfer,private media: Media,private datePipe: DatePipe) {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.typeDevice = 1;
                this.storageDirectory = this.file.dataDirectory;
            } else if (this.platform.is('android')) {
                this.typeDevice = 2;
                this.storageDirectory = this.file.externalRootDirectory;
            }
        });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WerdalroquiapagePage');
  }
  settingMusicControl(index){
    this.musicControls.destroy(); // it's the same with or without the destroy
    this.musicControls.create({
      track       : 'Test track',        // optional, default : ''
      artist      : 'test artist',                       // optional, default : ''
      cover       : '',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : true,                         // optional, default : false

      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
      hasSkipForward : false,  // show skip forward button, optional, default: false
      hasSkipBackward : false, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      // iOS only, optional
      album       : 'test album',     // optional, default: ''
      duration : 0, // optional, default: 0
      elapsed : 0, // optional, default: 0

      // Android only, optional
      // text displayed in the status bar when the notific\ation (and the ticker) are updated
      ticker    : 'Now playing test'
    });
    this.musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
      const message = JSON.parse(action).message;
      console.log('message', message);
      switch(message) {
        case 'music-controls-next':
          // Do something
          break;
        case 'music-controls-previous':
          // Do something
          break;
        case 'music-controls-pause':
          // Do something
          console.log('music pause');
          this.curr_playing_file[index].pause();
          this.musicControls.listen();
          this.musicControls.updateIsPlaying(false);
          break;
        case 'music-controls-play':
          // Do something
          console.log('music play');
          this.curr_playing_file[index].play();
          this.musicControls.listen();
          this.musicControls.updateIsPlaying(true);
          break;
        case 'music-controls-destroy':
          this.curr_playing_file[index].stop();
          this.curr_playing_file[index].release();
          this.position[index] = 0;
          break;
        // External controls (iOS only)
        case 'music-controls-toggle-play-pause' :
          // Do something
          break;
        case 'music-controls-seek-to':
          // Do something
          break;
        case 'music-controls-skip-forward':
          // Do something
          break;
        case 'music-controls-skip-backward':
          // Do something
          break;

        // Headset events (Android only)
        // All media button events are listed below
        case 'music-controls-media-button' :
          // Do something
          break;
        case 'music-controls-headset-unplugged':
          // Do something
          break;
        case 'music-controls-headset-plugged':
          // Do something
          break;
        default:
          break;
      }
    });
    this.musicControls.listen(); // activates the observable above
    this.musicControls.updateIsPlaying(true);
  }
    ngOnInit() {
            this.pageNumber = this.navParams.get('pagId');
        this.translate.get('werdalroquia'+this.pageNumber).subscribe( value => {
                this.pageNameTra = value;
            }
        );

        this.isBookMark(this.pageNumber).then(returnValue=>{
            if(returnValue)
                this.imageType = "1";
            else
                this.imageType = "0";
        });
        if(this.pageNumber == 31)
            this.countOfPage = 17;
        if(this.pageNumber == 4 || this.pageNumber == 6 || this.pageNumber == 7 || this.pageNumber == 8 || this.pageNumber == 13 || this.pageNumber == 16 || this.pageNumber == 18 || this.pageNumber == 20 || this.pageNumber == 22 || this.pageNumber == 23 || this.pageNumber == 24 )
            this.countOfPage = 1;
        if(this.pageNumber == 1 || this.pageNumber == 2 || this.pageNumber == 11 || this.pageNumber == 14 || this.pageNumber == 17 || this.pageNumber == 19 || this.pageNumber == 21 || this.pageNumber == 26 || this.pageNumber == 27 || this.pageNumber == 28)
            this.countOfPage = 2;
        if(this.pageNumber == 3 || this.pageNumber == 9 || this.pageNumber == 10 || this.pageNumber == 12 || this.pageNumber == 15 || this.pageNumber == 25)
            this.countOfPage = 3;
        if(this.pageNumber == 29)
            this.countOfPage = 15;
        if(this.pageNumber == 30)
            this.countOfPage = 5;
        if(this.pageNumber == 33)
            this.countOfPage = 4;
        let pageNumberData = this.pageNumber+16
        this.formpagesProvider.watchList(this.pageNameTra,'1',pageNumberData,'werdalroquia'+this.pageNumber).then(data=>{})
        //ايات البقرة
        this.storage.set('voiceNumber', '1');
        this.redingType=1;
        if(this.pageNumber == 1)
            this.soundOfArray[1] = ["b4aa6ec787fa94cdc7afc5bc7d98e96a.mp3","https://healingofthequran.com/werdAlroqya/1.mp3",'werdalroquia'+this.pageNumber,"التعويذات النبوية",'1'];
        if(this.pageNumber == 2)
            this.soundOfArray[1] = ["e7b90db81038c38ce1f9e6653d2e7356.mp3","https://healingofthequran.com/werdAlroqya/2.mp3",'werdalroquia'+this.pageNumber,"أدعية الشفاء والعافية",'2'];
        if(this.pageNumber == 3)
            this.soundOfArray[1] = ["3582fb71324c779883f6abeda7b88ed4.mp3","https://healingofthequran.com/werdAlroqya/3.mp3",'werdalroquia'+this.pageNumber,"أدعية دفع الهم والغم ورفع الكرب والبلاء",'3'];
        if(this.pageNumber == 4){
            this.soundOfArray[1] = ["3bf99d3c190008b2bac7d86b5e062b2d.mp3","https://healingofthequran.com/werdAlroqya/4.mp3",'werdalroquia'+this.pageNumber,"سورة الفاتحة" ,'4'];
            this.soundOfArray[2] = ["204c8da808a500b1baed42f897f7e166.mp3","https://healingofthequran.com/werdAlroqya/5.mp3",'werdalroquia'+this.pageNumber,"سورة الفاتحة",'5'];
        }
        if(this.pageNumber == 5){
            this.soundOfArray[1] = ["763d85de2b4470b8793a9bf2e303739a.mp3","https://healingofthequran.com/werdAlroqya/6.mp3","voiceOneName","سورة البقرة بصوت الشيخ سعد الغامدي",'6'];
            this.soundOfArray[2] = ["f4c1eff4e5a2c9a63a93ce7a8698f2fa.mp3","https://healingofthequran.com/werdAlroqya/7.mp3","voiceTowName","سورة البقرة بصوت الشيخ وديع اليمني",'7'];
            this.soundOfArray[3] = ["97fb89abbba7eafe6e3e3e076d1ad5a7.mp3","https://healingofthequran.com/werdAlroqya/8.mp3","voiceThreeName","سورة البقرة بصوت الشيخ احمد العجمي",'8'];
            this.soundOfArray[4] = ["567c26ea814c1942e6fe19b6ace63546.mp3","https://healingofthequran.com/werdAlroqya/9.mp3","voiceForeName","سورة البقرة بصوت الشيخ عبد الرحمن العوسي",'9'];
            this.soundOfArray[5] = ["b8f0320d4d79480b8713bd2a27c34366.mp3","https://healingofthequran.com/werdAlroqya/10.mp3","voiceFiveName","سورة البقرة بصوت الشيخ محمد الجوراني",'10'];
        }
        if(this.pageNumber == 6){
            this.soundOfArray[1] = ["c795ae671ca7d944fd0f563fc79a386c.mp3","https://healingofthequran.com/werdAlroqya/11.mp3",'werdalroquia'+this.pageNumber,"آية الكرسي",'11'];
            this.soundOfArray[2] = ["5f842dfb8eb6f41314dec438f1c07897.mp3","https://healingofthequran.com/werdAlroqya/12.mp3",'werdalroquia'+this.pageNumber,"آية الكرسي",'12'];
        }
        if(this.pageNumber == 7)
            this.soundOfArray[1] = ["85151636ea2841ea8b70cc92d772c251.mp3","https://healingofthequran.com/werdAlroqya/13.mp3",'werdalroquia'+this.pageNumber,"خواتيم سورة البقرة",'13'];
        if(this.pageNumber == 8){
            this.soundOfArray[1] = ["da496f77a10f9179e78c5db07689270e.mp3","https://healingofthequran.com/werdAlroqya/14.mp3",'werdalroquia'+this.pageNumber,"المُعوِّذات",'14'];
            this.soundOfArray[2] = ["3e0a4d6642acd324647decf5f59d2a53.mp3","https://healingofthequran.com/werdAlroqya/15.mp3",'werdalroquia'+this.pageNumber,"المُعوِّذات",'15'];
        }
        if(this.pageNumber == 9)
            this.soundOfArray[1] = ["46da36b60d1bf3b2ee2db87b32ee201c.mp3","https://healingofthequran.com/werdAlroqya/16.mp3",'werdalroquia'+this.pageNumber,"آيات رقية العين والحسد",'16'];
        if(this.pageNumber == 10)
            this.soundOfArray[1] = ["b0171737106ab90732d485c95bb6f523.mp3","https://healingofthequran.com/werdAlroqya/17.mp3",'werdalroquia'+this.pageNumber,"آيات رقية السحر",'17'];
        if(this.pageNumber == 11)
            this.soundOfArray[1] = ["3b7dd207f24ce04837973a5cf303fce9.mp3","https://healingofthequran.com/werdAlroqya/18.mp3",'werdalroquia'+this.pageNumber,"آيات الصبر بإذن الله",'18'];
        if(this.pageNumber == 12)
            this.soundOfArray[1] = ["4962ab285a391857ec772b56a818d6fb.mp3","https://healingofthequran.com/werdAlroqya/19.mp3",'werdalroquia'+this.pageNumber,"آيات النَّـصر بإذن الله",'19'];
        if(this.pageNumber == 13){
            this.soundOfArray[1] = ["3335686a767a635e69c2c5bb8ab45106.mp3","https://healingofthequran.com/werdAlroqya/20.mp3",'werdalroquia'+this.pageNumber,"آيات الشفاء بإذن الله" ,'20'];
            this.soundOfArray[2] = ["067d59f7281c1491adb7398672b17ff2.mp3","https://healingofthequran.com/werdAlroqya/21.mp3",'werdalroquia'+this.pageNumber,"آيات الشفاء بإذن الله" ,'21'];
        }
        if(this.pageNumber == 14){
            this.soundOfArray[1] = ["3ef89889f3da7b79f217748032ed87b5.mp3","https://healingofthequran.com/werdAlroqya/22.mp3",'werdalroquia'+this.pageNumber,"آيات السكينة بإذن الله" ,'22'];
            this.soundOfArray[2] = ["fdf0da782231457cf7d478a2693ebd3a.mp3","https://healingofthequran.com/werdAlroqya/23.mp3",'werdalroquia'+this.pageNumber,"آيات السكينة بإذن الله",'23'];
        }
        if(this.pageNumber == 15)
            this.soundOfArray[1] = ["e6adf6c14333a9782367466d28e8451e.mp3","https://healingofthequran.com/werdAlroqya/24.mp3",'werdalroquia'+this.pageNumber,"آيات الطمأنينة والانشراح" ,'24'];
        if(this.pageNumber == 16)
            this.soundOfArray[1] = ["d36ea46ef6d66981a34aaf7daa0f2c85.mp3","https://healingofthequran.com/werdAlroqya/25.mp3",'werdalroquia'+this.pageNumber,"آيات بِـرِّ الوالدين بإذن الله",'25'];
        if(this.pageNumber == 17)
            this.soundOfArray[1] = ["063fc29e47953453304f532ae9a4fff6.mp3","https://healingofthequran.com/werdAlroqya/26.mp3",'werdalroquia'+this.pageNumber,"آيات تيسير الرِّزق بإذن الله",'26'];
        if(this.pageNumber == 17)
            this.soundOfArray[1] = ["063fc29e47953453304f532ae9a4fff6.mp3","https://healingofthequran.com/werdAlroqya/26.mp3",'werdalroquia'+this.pageNumber,"آيات تيسير الرِّزق بإذن الله",'27'];
        if(this.pageNumber == 18)
            this.soundOfArray[1] = ["20c2b3914c11a7d1e8ee037a149d1ff3.mp3","https://healingofthequran.com/werdAlroqya/27.mp3",'werdalroquia'+this.pageNumber,"آيات علاج مرض النسيان بإذن الله",'28'];
        if(this.pageNumber == 19)
            this.soundOfArray[1] = ["1633e8631b23e6271697b5d6d5337c3e.mp3","https://healingofthequran.com/werdAlroqya/28.mp3",'werdalroquia'+this.pageNumber,"آيات رزق الذُّرية (علاج العُقُم ) بإذن الله",'29'];
        if(this.pageNumber == 20)
            this.soundOfArray[1] = ["7925ec5ad598973f5647ea5623bc8683.mp3","https://healingofthequran.com/werdAlroqya/29.mp3",'werdalroquia'+this.pageNumber,"آيات تثبيت الحمل ومنع الإسقاط بإذن الله",'30'];
        if(this.pageNumber == 21)
            this.soundOfArray[1] = ["7d58e836dfcdfce984176ce6cf5c5b85.mp3","https://healingofthequran.com/werdAlroqya/30.mp3",'werdalroquia'+this.pageNumber,"آيات لإزالة الأورام والدَّمامل والبثور بإذن الله",'31'];
        if(this.pageNumber == 22)
            this.soundOfArray[1] = ["0ec22ad12fab9c481f0c3f4ee86df97a.mp3","https://healingofthequran.com/werdAlroqya/31.mp3",'werdalroquia'+this.pageNumber,"آيات لإزالة أوجاع الصداع والعرق الضارب بإذن الله",'32'];
        if(this.pageNumber == 23)
            this.soundOfArray[1] = ["a50b6e1b675d1c6e341cfa37fd3d0fd0.mp3","https://healingofthequran.com/werdAlroqya/32.mp3",'werdalroquia'+this.pageNumber,"آيات  تنفع للإيقاف النزيف بإذن الله",'33'];
        if(this.pageNumber == 24)
            this.soundOfArray[1] = ["ee2d5a7dfc6d03393850372a27e566fd.mp3","https://healingofthequran.com/werdAlroqya/33.mp3",'werdalroquia'+this.pageNumber,"آيات لصرف الحرارة بإذن الله",'34'];
        if(this.pageNumber == 25)
            this.soundOfArray[1] = ["b58c7381ae52559814bfd517454d687d.mp3","https://healingofthequran.com/werdAlroqya/34.mp3",'werdalroquia'+this.pageNumber,"آيات الإحياء والإفاقة بإذن الله",'35'];
        if(this.pageNumber == 26)
            this.soundOfArray[1] = ["3b72393ab393d64816bd06ac6a4a5ec1.mp3","https://healingofthequran.com/werdAlroqya/35.mp3",'werdalroquia'+this.pageNumber,"آيات لمنع التهيج بإذن الله",'36'];
        if(this.pageNumber == 27)
            this.soundOfArray[1] = ["4976b05536fdf1205bdd918b01e92538.mp3","https://healingofthequran.com/werdAlroqya/36.mp3",'werdalroquia'+this.pageNumber,"آيات الهداية بإذن الله",'37'];
        if(this.pageNumber == 28)
            this.soundOfArray[1] = ["1ee6078bfdfdda1fbe96c2d93b1e5ec2.mp3","https://healingofthequran.com/werdAlroqya/37.mp3",'werdalroquia'+this.pageNumber,"آيات التأليف بإذن الله",'38'];
        if(this.pageNumber == 30)
            this.soundOfArray[1] = ["a1b537c856e622a10f841369b9a3ea05.mp3","https://healingofthequran.com/werdAlroqya/38.mp3",'werdalroquia'+this.pageNumber,"رقية تحصين الاطفال",'39'];
        if(this.pageNumber == 32)
            this.soundOfArray[1] = ["4d255c825f5e27026d844426311ce520.mp3","https://healingofthequran.com/werdAlroqya/39.mp3",'werdalroquia'+this.pageNumber,"الاذان",'40'];
        if(this.pageNumber == 33){
            this.soundOfArray[1] = ["ba0a735f2b2e307c2b52783dcac4350e.mp3","https://healingofthequran.com/werdAlroqya/40.mp3",'werdalroquia'+this.pageNumber,"رقية المس",'41'];
            this.soundOfArray[2] = ["a6360c18373013218444abc80aed7587.mp3","https://healingofthequran.com/werdAlroqya/41.mp3",'werdalroquia'+this.pageNumber,"رقية المس",'42'];
        }
        let transfer = this.transfer.create();
        let result = this.file.createDir(this.storageDirectory, "Download", true).then(res=>{
            this.allpath = res.toURL();
          for(let i=1;i<=this.soundOfArray.length;i++){
            if(this.soundOfArray[i]==null || this.soundOfArray[i] == undefined && this.soundOfArray[i]=="")
              continue;
            this.file.checkFile(this.allpath, this.soundOfArray[i][0]).then(files => {
              this.duration[i] = -1;
              this.position[i] = 0;
              this.is_playing[i]=false;
              this.is_in_play[i]=false;
              this.is_ready[i]=false;
              if(this.platform.is('ios'))
                this.allpath = this.allpath.replace("file:///","/");
              this.fullStorageDirectory[i] = this.allpath+this.soundOfArray[i][0];
              this.getDurationAndSetToPlay(i);
              this.showPlayButtonType[i]=1
            }).catch(err =>{
              this.duration[i] = -1;
              this.position[i] = 0;
              this.is_playing[i]=false;
              this.is_in_play[i]=false;
              this.is_ready[i]=false;
              this.fullStorageDirectory[i] = this.soundOfArray[i][1];
              this.getDurationAndSetToPlay(i);
              this.showPlayButtonType[i]=1
            });
          }
        });
        for(let i=1;i<this.soundOfArray.length;i++){
            this.isBookSoundMark(i).then(returnValue=>{
                if(returnValue){
                    this.imageSoundType = 1;
                }
                else
                    this.imageSoundType = 0;
            });
            if(this.soundOfArray[i]==null || this.soundOfArray[i] == undefined && this.soundOfArray[i]=="")
                continue;
            this.storage.get(this.soundOfArray[i][2]+this.soundOfArray[i][4]).then(bookmarks=>{
                this.repeatNumber[this.soundOfArray[i][4]] = [];
                if(bookmarks!="" && bookmarks!=null)
                    this.repeatNumber[this.soundOfArray[i][4]] = bookmarks;
                else
                    this.repeatNumber[this.soundOfArray[i][4]] = 1;
            });
            //this.prepareAudioFile(i);
        }
        for(let i=0;i < this.countOfPage;i++){
            let j = i+1;
            this.numperOFimage[i]="assets/imgs/werdalroquia/"+this.pageNumber+"_"+j+".jpg";
        }
        this.switchShow = this.navParams.get('switchShow');
        if(this.switchShow!=undefined)
            this.selectSegment = this.switchShow;
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse== "en") {
                    this.lang = 2;
                    this.switchDataMore = 0;
                    this.showReadOrWrite = 0;
                    this.selectSegment = "listening";
                    this.changeColor = "contentListening";
                    this.directionOfSlider = "ltr";
                    this.changeDirection = 1;
                }else{
                    this.lang = 1;
                    this.switchDataMore = 1;
                    this.directionOfSlider = "rtl";
                    this.changeDirection = 2;
                }
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en") {
                        this.lang = 2;
                        this.switchDataMore = 0;
                        this.showReadOrWrite = 0;
                        this.selectSegment = "listening";
                        this.changeColor = "contentListening";
                        this.directionOfSlider = "ltr";
                        this.changeDirection = 1;
                    }else{
                        this.lang = 1;
                        this.switchDataMore = 1;
                        this.directionOfSlider = "rtl";
                        this.changeDirection = 2;
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
    }
    ionViewDidLeave(){
        for(let i=1;i<this.soundOfArray.length;i++){
            if(this.curr_playing_file[i] == undefined)
                continue
            this.curr_playing_file[i].pause();
            //this.curr_playing_file[i].release();
            //this.position[i] = 0;
        }
    }
    downloadeRecordingAndroid(index:any){
        this.translate.get('loadding').subscribe( value => {
                this.loadding = value;
            }
        );
        let loading = this.loadingCtrl.create({
            content: this.loadding
        });
        loading.present();
        setTimeout(() => {loading.dismiss();}, 3000);
        this.translate.get('werdalroquia').subscribe( value => {
                this.pageNameTra = value;
            }
        );
        this.file.checkFile(this.allpath, this.soundOfArray[index][0]).then(files => {
        }).catch(err =>{
            let request: DownloadRequest = {
                uri: this.soundOfArray[index][1],
                title: this.pageNameTra,
                description: '',
                mimeType: '',
                visibleInDownloadsUi: true,
                notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
                destinationInExternalPublicDir: {
                    dirType: "Download",
                    subPath: this.soundOfArray[index][0]
                }
            };
            this.downloader.download(request).then((location: string) =>{
                this.duration[index] = -1;
                this.position[index] = 0;
                this.is_playing[index]=false;
                this.is_in_play[index]=false;
                this.is_ready[index]=false;
                this.fullStorageDirectory[index] = this.allpath+this.soundOfArray[index][0];
                this.getDurationAndSetToPlay(index);
                this.showPlayButtonType[index]=1
            }).catch((error: any) => console.error(error));
        });
    }
    downloadeRecordingIos(index:any){
        this.translate.get('loadding').subscribe( value => {
                this.loadding = value;
            }
        );
        let loading = this.loadingCtrl.create({
            content: this.loadding
        });
        loading.present();
        this.translate.get('werdalroquia').subscribe( value => {
                this.pageNameTra = value;
            }
        );
        let transfer = this.transfer.create();
        this.file.checkFile(this.allpath, this.soundOfArray[index][0]).then(files => {
        }).catch(err =>{
            transfer.download(encodeURI(this.soundOfArray[index][1]),this.allpath+this.soundOfArray[index][0]).then(entry =>{
                loading.dismiss();
                this.duration[index] = -1;
                this.position[index] = 0;
                this.is_playing[index]=false;
                this.is_in_play[index]=false;
                this.is_ready[index]=false;
                this.allpath = this.allpath.replace("file:///","/");
                this.fullStorageDirectory[index] = this.allpath+this.soundOfArray[index][0];
                this.getDurationAndSetToPlay(index);
                this.showPlayButtonType[index]=1
            })
        });
    }
    prepareAudioFile(index:any) {
        this.duration[index] = -1;
        this.position[index] = 0;
        this.is_playing[index]=false;
        this.is_in_play[index]=false;
        this.is_ready[index]=false;
        let transfer = this.transfer.create();
        let result = this.file.createDir(this.storageDirectory, "Download", true).then(res=>{
            let allpath = res.toURL();
            this.file.checkFile(allpath, this.soundOfArray[index][0]).then(files => {
                this.fullStorageDirectory[index] = allpath+this.soundOfArray[index][0];
                this.getDurationAndSetToPlay(index)
            }).catch(err =>{
                this.fullStorageDirectory[index] = this.soundOfArray[index][1];
                this.getDurationAndSetToPlay(index)
                transfer.download(this.soundOfArray[index][1],allpath+this.soundOfArray[index][0]).then(entry =>{
                }).catch(err =>{
                    this.fullStorageDirectory[index] = this.soundOfArray[index][1];
                    this.getDurationAndSetToPlay(index)
                });
            });
        }).catch(err =>{
            this.fullStorageDirectory[index] = this.soundOfArray[index][1];
            this.getDurationAndSetToPlay(index)
        });
    }
    createAudioFile(pathToDirectory): MediaObject {
        return this.media.create(pathToDirectory);
    }
    getDurationAndSetToPlay(indexNew:any) {
        this.curr_playing_file[indexNew] = this.createAudioFile(this.fullStorageDirectory[indexNew]);
        this.curr_playing_file[indexNew].play();
        this.curr_playing_file[indexNew].setVolume(0.0); // you don't want users to notice that you are playing the file
        let self = this;
        this.get_duration_interval[indexNew] = setInterval(function() {
            if (self.duration[indexNew] == -1) {
                self.duration[indexNew] = ~~self.curr_playing_file[indexNew].getDuration(); // make it an integer
            } else {
                self.curr_playing_file[indexNew].stop();
                self.curr_playing_file[indexNew].release();
                self.setRecordingToPlay(indexNew);
                clearInterval(self.get_duration_interval[indexNew]);
            }
        }, 100);
    }
    getAndSetCurrentAudioPosition(index:any) {
        let diff = 1;
        let self = this;
        this.get_position_interval[index] = setInterval(function() {
            let last_position = self.position[index];
            self.curr_playing_file[index].getCurrentPosition().then(position => {
                if (position >= 0 && position < self.duration[index]) {
                    if (Math.abs(last_position - position) >= diff) {
                        // set position
                        self.curr_playing_file[index].seekTo(last_position * 1000);
                    } else {
                        // update position for display
                        self.position[index] = position;
                    }
                } else if (position >= self.duration[index]) {
                    self.stopPlayRecording(index);
                    self.setRecordingToPlay(index);
                }
            });
        }, 100);
    }
    setRecordingToPlay(index:any) {
        this.curr_playing_file[index] = this.createAudioFile(this.fullStorageDirectory[index]);
        this.curr_playing_file[index].onStatusUpdate.subscribe(status => {
            // 2: playing
            // 3: pause
            // 4: stop
            this.message = status;
            switch (status) {
                case 1:
                    this.is_in_play[index] = false;
                    break;
                case 2: // 2: playing
                    this.is_in_play[index] = true;
                    this.is_playing[index] = true;
                    break;
                case 3: // 3: pause
                    this.is_in_play[index] = true;
                    this.is_playing[index] = false;
                    break;
                case 4: // 4: stop
                default:
                    this.storage.get(this.soundOfArray[index][2]+this.soundOfArray[index][4]).then(bookmarks=>{
                        this.bookmarksRepeted = bookmarks;
                        if(this.bookmarksRepeted !="" && this.bookmarksRepeted !="null" && this.bookmarksRepeted != 0 && this.bookmarksRepeted != null){
                            this.repeatNumber[this.soundOfArray[index][4]] = [];
                            this.repeatNumber[this.soundOfArray[index][4]] = this.bookmarksRepeted-1;
                            this.storage.set(this.soundOfArray[index][2]+this.soundOfArray[index][4], this.repeatNumber[this.soundOfArray[index][4]]);
                            this.playRecording();
                        }
                    });
                    this.is_in_play[index] = false;
                    this.is_playing[index] = false;
                    break;
            }
        });
        this.message = 'audio file set';
        this.is_ready[index] = true;
        this.getAndSetCurrentAudioPosition(index);
    }
    playRecording() {
        this.storage.get('voiceNumber').then((val) => {
            this.redingType = val;
            this.formpagesProvider.watchList(this.soundOfArray[val][3],'2',17,this.soundOfArray[val][2],this.soundOfArray[val][1]).then(data=>{})
            for(let i=1;i<this.soundOfArray.length;i++){
                if(i==val || this.curr_playing_file[i] == undefined)
                    continue
                this.curr_playing_file[i].stop();
                this.curr_playing_file[i].release();
                this.position[i] = 0;
            }
            this.curr_playing_file[val].play();
            this.storage.get('runMediaInBackgound').then((values) => {
              if(values == 1)
                this.settingMusicControl(val);
            });
        });
    }
    pausePlayRecording() {
        this.storage.get('voiceNumber').then((val) => {
            this.curr_playing_file[val].pause();
            this.storage.get('runMediaInBackgound').then((values) => {
              if(values == 1){
                this.musicControls.listen();
                this.musicControls.updateIsPlaying(false);
              }
            });
        });
    }
    stopPlayRecording(index:any) {
        this.curr_playing_file[index].stop();
        this.curr_playing_file[index].release();
        clearInterval(this.get_position_interval[index]);
        this.position[index] = 0;
    }
    controlSeconds(action) {
        this.storage.get('voiceNumber').then((val) => {
            let step = 15;
            let number = this.position[val];
            switch (action) {
                case 'back':
                    this.position[val] = number < step ? 0.001 : number - step;
                    break;
                case 'forward':
                    this.position[val] =
                        number + step < this.duration[val] ? number + step : this.duration[val];
                    break;
                default:
                    break;
            }
        });
    }
    fmtMSS(s) {
        return this.datePipe.transform(s * 1000, 'mm:ss');
    }
    repeatAudio(number:any,soundNumber:any,type:any){
        this.repeatNumber[this.soundOfArray[soundNumber][4]] = [];
        if(type == 1)
            this.repeatNumber[this.soundOfArray[soundNumber][4]] = number+1;
        else{
            if(number >0)
                this.repeatNumber[this.soundOfArray[soundNumber][4]] = number-1;
            else
                this.repeatNumber[this.soundOfArray[soundNumber][4]] = number;
        }
        this.storage.set(this.soundOfArray[soundNumber][2]+this.soundOfArray[soundNumber][4], this.repeatNumber[this.soundOfArray[soundNumber][4]]);
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
        this.navCtrl.setRoot("WerdalroquiaPage");
    }
    openMenu() {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: this.translate.instant('voiceOne'),
                    handler: () => {
                        for(let i=1;i<this.soundOfArray.length;i++){
                            if(this.curr_playing_file[i] == undefined)
                                continue
                            this.curr_playing_file[i].stop();
                            this.curr_playing_file[i].release();
                            this.position[i] = 0;
                        }
                        this.storage.get('repeatNumRoquiatwerd1').then(bookmarks=>{
                            this.repeatNumber = bookmarks;
                        });
                        this.storage.set('voiceNumber', '1');
                    }
                },
                {
                    text: this.translate.instant('voiceTow'),
                    handler: () => {
                        for(let i=1;i<this.soundOfArray.length;i++){
                            if(this.curr_playing_file[i] == undefined)
                                continue
                            this.curr_playing_file[i].stop();
                            this.curr_playing_file[i].release();
                            this.position[i] = 0;
                        }
                        this.storage.get('repeatNumRoquiatwerd2').then(bookmarks=>{
                            this.repeatNumber = bookmarks;
                        });
                        this.storage.set('voiceNumber', '2');
                    }
                },
                {
                    text: this.translate.instant('voiceThree'),
                    handler: () => {
                        for(let i=1;i<this.soundOfArray.length;i++){
                            if(this.curr_playing_file[i] == undefined)
                                continue
                            this.curr_playing_file[i].stop();
                            this.curr_playing_file[i].release();
                            this.position[i] = 0;
                        }
                        this.storage.get('repeatNumRoquiatwerd3').then(bookmarks=>{
                            this.repeatNumber = bookmarks;
                        });
                        this.storage.set('voiceNumber', '3');
                    }
                },
                {
                    text: this.translate.instant('voiceFore'),
                    handler: () => {
                        for(let i=1;i<this.soundOfArray.length;i++){
                            if(this.curr_playing_file[i] == undefined)
                                continue
                            this.curr_playing_file[i].stop();
                            this.curr_playing_file[i].release();
                            this.position[i] = 0;
                        }
                        this.storage.get('repeatNumRoquiatwerd4').then(bookmarks=>{
                            this.repeatNumber = bookmarks;
                        });
                        this.storage.set('voiceNumber', '4');
                    }
                },
                {
                    text: this.translate.instant('voiceFive'),
                    handler: () => {
                        for(let i=1;i<this.soundOfArray.length;i++){
                            if(this.curr_playing_file[i] == undefined)
                                continue
                            this.curr_playing_file[i].stop();
                            this.curr_playing_file[i].release();
                            this.position[i] = 0;
                        }
                        this.storage.get('repeatNumRoquiatwerd5').then(bookmarks=>{
                            this.repeatNumber = bookmarks;
                        });
                        this.storage.set('voiceNumber', '5');
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
    changeSoundShow(sound:any){
        for(let i=1;i<this.soundOfArray.length;i++){
            if(this.curr_playing_file[i] == undefined)
                continue
            this.curr_playing_file[i].stop();
            this.curr_playing_file[i].release();
            this.position[i] = 0;
        }
        this.storage.set('voiceNumber',sound);
        this.lightButton = sound;
        this.redingType = sound;
        this.storage.get(this.soundOfArray[sound][2]+this.soundOfArray[sound][4]).then(bookmarks=>{
            this.repeatNumber[this.soundOfArray[sound][4]]=[];
            this.repeatNumber[this.soundOfArray[sound][4]] = bookmarks;
        });

    }
    changeBckColor(switchData:any) {
        this.switchDataMore = switchData;
        if (switchData == 1)
            this.changeColor = "contentReading";
        else
            this.changeColor = "contentListening";
    }
    //added to bokmark
    bookMark(){
        return this.storage.get('bookMarks').then(bookmarks=>{
            if(bookmarks == null)
                bookmarks = new Array<any>();
            return bookmarks;
        });
    }
    isBookMark(pageNumber:any){
        return this.bookMark().then(realVal=>{
            let pageNumberAdd = pageNumber+16
            for(let i = 0;i < realVal.length;i++){
                if(realVal[i][1] == pageNumberAdd)
                    return true;
            }
            return false;
        });
    }
    addBookMark(pageNumber:any){
        this.translate.get('werdalroquia'+pageNumber).subscribe( value => {
                this.pageNameTra = value;
            }
        );
        let pageNumberAdd = pageNumber+16;
        this.bookmarksArray = [this.pageNameTra,pageNumberAdd];
        this.bookMark().then(realVal=>{
            realVal.push(this.bookmarksArray);
            this.storage.set('bookMarks',realVal);
        });
    }
    removeBookMark(pageNumber:any){
        this.bookMark().then(realVal=>{
            let pageNumberAdd = pageNumber+16;
            for(let i = 0;i < realVal.length;i++){
                realVal.splice(realVal.findIndex(elm => realVal[i][2] == pageNumberAdd) ,1)
            }
            this.imageType = 0;
            this.storage.set('bookMarks',realVal);
        });
    }
    saveBookMark(pageNumber:any){
        this.isBookMark(pageNumber).then(returnValue=>{
            if(!returnValue){
                this.addBookMark(pageNumber);
                this.imageType = 1;
            }else
                this.imageType = 0;

        });
    }
    //added to bokmarksound
    bookSoundMark(){
        return this.storage.get('bookSoundMarks').then(bookmarks=>{
            if(bookmarks == null)
                bookmarks = new Array<any>();
            return bookmarks;
        });
    }
    isBookSoundMark(soundType:any){
        return this.bookSoundMark().then(realSoundVal=>{
            for(let i = 0;i < realSoundVal.length;i++){
                if(realSoundVal[i][0] == this.soundOfArray[soundType][0])
                    return true;
            }
            return false;
        });
    }
    addBookSoundMark(soundType:any){
        this.translate.get(this.soundOfArray[soundType][2]).subscribe( value => {
                this.pageNameTra = value;
            }
        );
        this.bookmarksSoundArray = [this.soundOfArray[soundType][0],this.pageNameTra,this.soundOfArray[soundType][2],this.soundOfArray[soundType][4],this.soundOfArray[soundType][1]];
        this.bookSoundMark().then(realSoundVal=>{
            realSoundVal.push(this.bookmarksSoundArray);
            this.storage.set('bookSoundMarks',realSoundVal);
        });
    }
    saveBookSoundMark(soundType:any){
        this.isBookSoundMark(soundType).then(returnValue=>{
            if(!returnValue){
                this.addBookSoundMark(soundType);
                this.imageSoundType = 1;
            }else
                this.imageSoundType = 0;

        });
    }
    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'جاري تنزيل ملفات الصوت يرجى الانتظار'
        });
        loading.present();
        setTimeout(() => {loading.dismiss();}, 50000);
    }
}
