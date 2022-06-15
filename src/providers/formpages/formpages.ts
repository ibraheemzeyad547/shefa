import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the FormpagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormpagesProvider {
    private url : string
    private urlMaqolat : string;
    private urlMaqolatNotification : string;
    private askquestion : string;
    private sharedusUrl : string;
    private talkusUrl : string;
    private consultationUrl : string;
    private watchListUrl : string;
    public result:any;
  constructor(public http: HTTP,public httpPost: HttpClient) {
      this.url = "https://healingofthequran.com/API/questions/";
      this.urlMaqolat = "https://healingofthequran.com/API/maqolat/";
      this.askquestion = "https://healingofthequran.com/API/askquestion/";
      this.sharedusUrl = "https://healingofthequran.com/API/sharedus/";
      this.talkusUrl = "https://healingofthequran.com/API/talkus/";
      this.consultationUrl = "https://healingofthequran.com/API/consultation/";
      this.watchListUrl = "https://healingofthequran.com/API/watchList/";
      this.urlMaqolatNotification = "https://healingofthequran.com/API/maqolatNotification/";
  }
    // getALLQuestions(lang:any){
    //     return new Promise(resolve => {
    //         this.http.get(this.url+lang, {}, {}).then(data => {
    //             return this.result = resolve(data.data);
    //         }, err => {
    //             console.log(err);
    //         });
    //     });
    // }
    getALLQuestions(lang:any){
        return new Promise(resolve => {
            console.log(this.url+lang)
            this.httpPost.get(this.url+lang).subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    getMaqolatNotification(lang:any,num:any){
        return new Promise(resolve => {
            this.httpPost.get(this.urlMaqolatNotification+lang+"/"+num).subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    getALLMaqolat(lang:any){
        return new Promise(resolve => {
            this.httpPost.get(this.urlMaqolat+lang).subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    getALLWatchList(type:any,limit:any){
        return new Promise(resolve => {
            this.httpPost.get(this.watchListUrl+type+"/"+limit).subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    askQuestion(name:any,country:any,email:any,message:any,lang:any){
        return new Promise(resolve => {
            this.httpPost.post(this.askquestion+name+"/"+country+"/"+email+"/"+message+"/"+lang,"").subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    watchList(pageName:any,type:any,pageNumber:any,pageNameInApp:any,reyalNumber:any=0){
        return new Promise(resolve => {
            this.httpPost.post(this.watchListUrl+pageName+"/"+type+"/"+pageNumber+"/"+pageNameInApp+"/"+reyalNumber,"").subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    sharedus(name:any,country:any,email:any,message:any,lang:any){
        return new Promise(resolve => {
            this.httpPost.post(this.sharedusUrl+name+"/"+country+"/"+email+"/"+message+"/"+lang,"").subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    talkus(name:any,country:any,email:any,message:any,lang:any){
        return new Promise(resolve => {
            this.httpPost.post(this.talkusUrl+name+"/"+country+"/"+email+"/"+message+"/"+lang,"" ).subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
    consultation(name:any,country:any,email:any,message:any,lang:any){
        return new Promise(resolve => {
            this.httpPost.post(this.consultationUrl+name+"/"+country+"/"+email+"/"+message+"/"+lang,"").subscribe(data => {
                return this.result = resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }
}
