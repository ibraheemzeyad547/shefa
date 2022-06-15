import { Component,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage,NavController, LoadingController, Platform, ToastController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DatePipe } from '@angular/common';
import { Scroll } from 'ionic-angular';
import { MusicControls } from '@ionic-native/music-controls';
/**
 * Generated class for the MostlistenedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostlistened',
  templateUrl: 'mostlistened.html',
})
export class MostlistenedPage {
    @ViewChild('scrollWeb') scrollWeb: Scroll;
    allpages:any;
    imageType:any = "0";
    pageName:any=[];
    pageNameRe:any;
    lang:any;
    returnMaqolatData:any;
    responseResponseMaqolatStatus:any;
    responseMaqolatData:any;
    returnDataMaqolat:any=[];
    returnWatchListData:any;
    responseResponseWatchListStatus:any;
    responseWatchListData:any;
    returnDataWatchList:any=[];
    pageNameTra:any;
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
    repeatNumber:any=[];
    soundOfArray:any=[];
    storageDirectory: any;
    bookmarksRepeted:any;
    redingType:any;
    lastNumber:any;
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    countRturnData:any = 1;
    numberOfData:any = 1;
    constructor(public musicControls: MusicControls,private formpagesProvider:FormpagesProvider,private datePipe: DatePipe,private storage: Storage,private platform: Platform,public navCtrl: NavController, public navParams: NavParams,private translate: TranslateService,private toastCtrl: ToastController, private file: File,private transfer: FileTransfer,private media: Media) {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.storageDirectory = this.file.dataDirectory;
            } else if (this.platform.is('android')) {
                this.storageDirectory = this.file.externalRootDirectory;
            }
        });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MostlistenedPage');
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
        this.redingType = 1;
        this.storage.set('changeSound', '1');
        let transfer = this.transfer.create();
        this.functionMostLesendLWatch(this.countRturnData);
    }
    functionMostLesendLWatch(countData){
        this.formpagesProvider.getALLWatchList(2,countData).then(async data=>{
            this.returnWatchListData = data;
            this.responseResponseWatchListStatus = this.returnWatchListData.ResponseStatus;
            this.responseWatchListData="";
            if(this.responseResponseWatchListStatus=="success"){
                this.responseWatchListData = this.returnWatchListData.Data.watchList;
                for(let i = 0; i < this.responseWatchListData.length;i++){
                  this.repeatNumber[i]=0;
                  this.storage.get('repeatNumRoquiatmostlistened'+i).then(bookmarks=>{
                    this.repeatNumber[i]=bookmarks;
                  });
                  this.returnDataWatchList[i]=[];
                  this.returnDataWatchList[i]['pageName'] = this.responseWatchListData[i].pageName;
                  this.returnDataWatchList[i]['pageNameInApp'] = this.pageNameTra;
                  this.returnDataWatchList[i]['realNum'] = this.responseWatchListData[i].realNum;
                  this.returnDataWatchList[i]['num'] = i;
                  this.soundOfArray[i] = this.responseWatchListData[i].realNum;
                 await this.prepareAudioFile(i);
                  this.lastNumber = i;
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
    ionViewDidLeave(){
        for(let i=1;i<this.soundOfArray.length;i++){
            if(this.curr_playing_file[i] == undefined)
                continue
            this.curr_playing_file[i].stop();
            this.curr_playing_file[i].release();
            this.position[i] = 0;
        }
    }
    async prepareAudioFile(index:any) {
        this.duration[index] = -1;
        this.position[index] = 0;
        this.is_playing[index]=false;
        this.is_in_play[index]=false;
        this.is_ready[index]=false;
      this.fullStorageDirectory[index] = this.soundOfArray[index];
      this.getDurationAndSetToPlay(index)
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
                    this.storage.get('repeatNumRoquiatmostlistened'+index).then(bookmarks=>{
                        this.bookmarksRepeted = bookmarks;
                        if(this.bookmarksRepeted !="" && this.bookmarksRepeted !="null" && this.bookmarksRepeted != 0 && this.bookmarksRepeted != null){
                            this.repeatNumber[index] = this.bookmarksRepeted-1;
                            this.storage.set('repeatNumRoquiatmostlistened'+index, this.repeatNumber[index]);
                            this.playRecording(this.redingType);
                        }else{
                            this.storage.get('changeSoundAction').then(action => {
                                if (action == 'b') {
                                    if (this.redingType == 1)
                                        this.redingType = 1;
                                    else
                                        this.redingType = eval(this.redingType) - 1;
                                    this.storage.set('changeSound',this.redingType);
                                    this.playRecording(this.redingType);
                                } else if (action == 'n') {
                                    if (this.redingType == this.lastNumber)
                                        this.redingType = this.lastNumber;
                                    else
                                        this.redingType = eval(this.redingType) + 1;
                                    this.storage.set('changeSound',this.redingType);
                                    this.playRecording(this.redingType);
                                } else if (action == 0){
                                    if(this.redingType==this.lastNumber){
                                        this.redingType = this.lastNumber;
                                        this.storage.set('changeSound',this.redingType);
                                        this.pausePlayRecording();
                                    }
                                    else{
                                        this.redingType = eval(this.redingType)+1;
                                        this.storage.set('changeSound',this.redingType);
                                        this.playRecording(this.redingType);
                                    }
                                }
                            });
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
    playRecording(action) {
        this.storage.set('changeSoundAction',0);
        if(action=='b'){
            this.curr_playing_file[this.redingType].stop();
            this.curr_playing_file[this.redingType].release();
            this.position[this.redingType] = 0;
            this.storage.set('changeSoundAction','b');
        }else if(action=='n'){
            this.curr_playing_file[this.redingType].stop();
            this.curr_playing_file[this.redingType].release();
            this.position[this.redingType] = 0;
            this.storage.set('changeSoundAction','n');
        }else if(action=='a'){
            this.curr_playing_file[this.redingType].play();
            this.storage.set('changeSoundAction','a');
          this.storage.get('runMediaInBackgound').then((values) => {
            if(values == 1)
              this.settingMusicControl(this.redingType);
          });
        }else{
            this.storage.set('changeSoundAction',action);
            this.storage.set('changeSound',action);
            this.storage.get('changeSound').then((val) => {
                this.redingType = val;
                for(let i=0;i<this.soundOfArray.length;i++){
                    if(i==val)
                        continue;
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
    }
    pausePlayRecording() {
        this.storage.get('changeSound').then((val) => {
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
    fmtMSS(s) {
        return this.datePipe.transform(s * 1000, 'mm:ss');
    }
    repeatAudio(number:any,soundNumber:any){
        this.repeatNumber[soundNumber] = number+1;
        this.storage.set('repeatNumRoquiatmostlistened'+soundNumber, this.repeatNumber[soundNumber]);
    }
}
