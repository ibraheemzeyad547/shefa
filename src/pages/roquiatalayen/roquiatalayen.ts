import { Component } from '@angular/core';
import { IonicPage,NavController, LoadingController, Platform, ToastController,NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FormpagesProvider } from '../../providers/formpages/formpages';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader';
import { MusicControls } from '@ionic-native/music-controls';
/**
 * Generated class for the RoquiatalayenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roquiatalayen',
  templateUrl: 'roquiatalayen.html',
})
export class RoquiatalayenPage {
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
    soundOfArray:any=[];
    lightButton:any=1;
    redingType:any;
    storageDirectory: any;
    selectSegment: string = "soundOne";
    showReadOrWrite:number = 1;
    currentIndex: number = -1;
    repeatNumber:any=[];
    changeDirection:number = 2;
    switchIcon:number = 1;
    imageSoundTypeOne:any = "0";
    imageSoundTypeTow:any = "0";
    imageSoundTypeThree:any = "0";
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
    changeSound:number = 1;
    allpath:any;
    showPlayButtonType:any=[];
    forAllALLMaqolat:any;
    showAllALLMaqolat:any;
    loadding:any;
    typeDevice:any;
    constructor(public musicControls: MusicControls,private downloader: Downloader,private formpagesProvider:FormpagesProvider,private translate: TranslateService,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private platform: Platform, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private file: File,private transfer: FileTransfer,private media: Media,private datePipe: DatePipe) {
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
    console.log('ionViewDidLoad RoquiatalayenPage');
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
        for(let j=1;j<=3;j++){
            this.isBookSoundMark(j).then(returnValue=>{
                if(returnValue){
                    if(j==1)
                        this.imageSoundTypeOne = 1;
                    else if(j==2)
                        this.imageSoundTypeTow = 1;
                    else
                        this.imageSoundTypeThree = 1;
                }
                else{
                    if(j==1)
                        this.imageSoundTypeOne = 0;
                    else if(j==2)
                        this.imageSoundTypeTow = 0;
                    else
                        this.imageSoundTypeThree = 0;
                }
            });
        }
        this.storage.get('selectedLang').then(langUse=>{
            if(langUse!=null && langUse!=undefined && langUse!="") {
                if (langUse == "en") {
                    this.lang = 2;
                    this.showReadOrWrite = 0;
                    this.changeDirection = 1;
                }else{
                    this.lang = 1;
                    this.changeDirection = 2;
                }
            }else{
                if (this.translate.getBrowserLang() !== undefined) {
                    if (this.translate.getBrowserLang() == "en") {
                        this.lang = 2;
                        this.showReadOrWrite = 0;
                        this.changeDirection = 1;
                    }else{
                        this.lang = 1;
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
        this.redingType=1;
        this.storage.set('changeSound', '1');
        this.soundOfArray[1] =  ["44322c5d4d07cebe5ca8205a887a7d10.mp3","https://healingofthequran.com/menu/4.mp3","roquiatalayen","رقية العين والحسد",'1'];
        this.soundOfArray[2] =  ["2d3953f081fa9ca8d24a854d9cae404d.mp3","https://healingofthequran.com/menu/5.mp3","roquiatalayen","رقية العين والحسد",'2'];
        this.soundOfArray[3] = ["88053f5d97da23ef05618b064ac8c50b.mp3","https://healingofthequran.com/menu/6.mp3","roquiatalayen","رقية العين والحسد",'3'];
        let transfer = this.transfer.create();
        let result = this.file.createDir(this.storageDirectory, "Download", true).then(res=>{
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
            if(this.soundOfArray[i]==null || this.soundOfArray[i] == undefined && this.soundOfArray[i]=="")
                continue;
            this.storage.get(this.soundOfArray[i][2]+this.soundOfArray[i][4]).then(bookmarks=>{
                this.repeatNumber[i] = [];
                if(bookmarks!="" && bookmarks!=null)
                    this.repeatNumber[i] = bookmarks;
                else
                    this.repeatNumber[i] = 1;
            });
        }
    }
    ionViewDidLeave(){
        for(let i=1;i<this.soundOfArray.length;i++){
            if(this.curr_playing_file[i] == undefined)
                continue
            this.curr_playing_file[i].pause();
            //this.curr_playing_file[i].release();
           // this.position[i] = 0;
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
        this.translate.get('roquiatalayen').subscribe( value => {
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
        this.translate.get('roquiatalayen').subscribe( value => {
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
                            this.repeatNumber[index] = [];
                            this.repeatNumber[index] = this.bookmarksRepeted-1;
                            this.storage.set(this.soundOfArray[index][2]+this.soundOfArray[index][4], this.repeatNumber[index]);
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
        this.storage.get('changeSound').then((val) => {
            this.redingType = val;
            this.formpagesProvider.watchList(this.soundOfArray[val][3],'2',52,this.soundOfArray[val][2],this.soundOfArray[val][1]).then(data=>{})
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
    controlSeconds(action) {
        this.storage.get('changeSound').then((val) => {
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
    changeSoundShow(sound:any){
        for(let i=1;i<this.soundOfArray.length;i++){
            if(this.curr_playing_file[i] == undefined)
                continue
            this.curr_playing_file[i].stop();
            this.curr_playing_file[i].release();
            this.position[i] = 0;
        }
        this.storage.set('changeSound',sound);
        this.lightButton = sound;
        this.redingType = sound;
        this.storage.get(this.soundOfArray[sound][2]+this.soundOfArray[sound][4]).then(bookmarks=>{
            this.repeatNumber[sound]=[];
            this.repeatNumber[sound] = bookmarks;
        });
    }
    repeatAudio(number:any,soundNumber:any,type:any){
        this.repeatNumber[soundNumber] = [];
        if(type == 1)
            this.repeatNumber[soundNumber] = number+1;
        else{
            if(number >0)
                this.repeatNumber[soundNumber] = number-1;
            else
                this.repeatNumber[soundNumber] = number;
        }
        this.storage.set(this.soundOfArray[soundNumber][2]+this.soundOfArray[soundNumber][4], this.repeatNumber[soundNumber]);
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
        this.translate.get('roquiatalayen').subscribe( value => {
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
                if(soundType==1)
                    this.imageSoundTypeOne = 1;
                else if(soundType==2)
                    this.imageSoundTypeTow = 1;
                else
                    this.imageSoundTypeThree = 1;
            }else{
                if(soundType==1)
                    this.imageSoundTypeOne = 0;
                else if(soundType==2)
                    this.imageSoundTypeTow = 0;
                else
                    this.imageSoundTypeThree = 0;
            }
        });
    }
}
