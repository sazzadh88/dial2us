import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AddComplaintPage } from '../add-complaint/add-complaint';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';



import { Media } from '@ionic-native/media';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Media, Network]
})

export class HomePage {
  token = '';
  loading:any;
  username:string;
  userid:number;
  recording: boolean = false;
  filePath: any;
  fileName: any;
  audioList: any[] = [];
  imageURI:any;
  imageFileName:any;
  audio:any;

  constructor(private transfer: Transfer,public loadingCtrl:LoadingController, public platform: Platform, private media: Media,private file: File,private network: Network, public navCtrl: NavController) {

  }
 

  ionViewDidLoad() {
    let access_token = localStorage.getItem('token');
    this.token = access_token;
    let userData = JSON.parse(localStorage.getItem('user'));
    this.username =  userData.name;
    this.userid =  userData.id; 
    this.check(); 
  }

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      // console.log(this.audioList);
    }
  }

  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      // this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.filePath =  this.file.applicationStorageDirectory+'/tmp/'  + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);

    // console.log(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
      this.upload(file);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
      this.upload(file);
  
    }
    
    // this.audio.play();
    // this.audio.setVolume(0.8);
  }

  upload(file){

    console.log("Upload function called");
     // Destination URL
   var url = "http://dial.dial2us.com/api/record";
 
   // File for Upload
   var targetPath = this.filePath;

  
   // File name only
   var filename = file;
  
   var options = {
     fileKey: "filex",
     fileName: filename,
     chunkedMode: false,
     mimeType: "multipart/form-data",
     params : {'fileName': filename}
   };
  
   const fileTransfer: TransferObject = this.transfer.create();
  
   this.loading = this.loadingCtrl.create({
     content: 'Uploading...',
   });
   this.loading.present();
  
   // Use the FileTransfer to upload the image
   fileTransfer.upload(targetPath, url, options).then(data => {
     this.loading.dismissAll()
     console.log('Image succesful uploaded.-> ' + JSON.stringify(data));
   }, err => {
     this.loading.dismissAll()
     console.log('Error while uploading file.' + JSON.stringify(err));
   }); 
  }

  
  
  check(){

    console.log("Network Called");
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log(this.network.type);
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    

    
    // stop connect watch
    connectSubscription.unsubscribe();
  }

  navToAddComplaint(){
    this.navCtrl.push(AddComplaintPage);
  }


}
