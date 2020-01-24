import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  // rou=[
  // {
  //   awal:"10.00 AM",
  //   akhir:"11.00 AM",
  //   mapel:"B.inggris",
  //   ruang:"Ruang 7"
  // },
  // {
  //   awal:"10.00 AM",
  //   akhir:"11.00 AM",
  //   mapel:"B.inggris",
  //   ruang:"Ruang 7"
  // },
  // {
  //   awal:"10.00 AM",
  //   akhir:"11.00 AM",
  //   mapel:"B.inggris",
  //   ruang:"Ruang 7"
  // },
  // {
  //   awal:"10.00 AM",
  //   akhir:"11.00 AM",
  //   mapel:"B.inggris",
  //   ruang:"Ruang 7"
  // }
  // ];

  datas:any=[
    {
      data:[
        {
            time:'10:30:30'
        },
        {
            time:'10:30:30'
        }
      ]
    }
  ];


  kelas:any;
  token:any;
  role:any;


  fakes:any=[
    {number:1},
    {number:2}
  ];
  trigger:boolean=false;
  trigger2:boolean=false;

  currentTime = '13:45:56';
  finalTime: any;

  Subscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  name:any;
  
  constructor(private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private alert:AlertController,
    private api:APIService,
    private platform:Platform) {

    }


    async presentAlertConfirm() {
      const alert = await this.alert.create({
        // header: 'Confirm!',
        message: 'Are you sure you want to exit the app?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Close App',
          handler: () => {
            navigator['app'].exitApp();
          }
        }]
      });
    
      await alert.present();
    }

  ionViewWillEnter()
  {
  

    this.getRole();
    this.getData();
    this.Subscription = this.platform.backButton.subscribe(() => {
      this.Subscription =  this.platform.backButton.subscribeWithPriority(0, () => {    
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
        } else {
          navigator['app'].exitApp();
        }
       });
    })
  }

  ionViewWillLeave()
  {
      this.Subscription.unsubscribe();
  }

  async getRole()
  {
    let role = await this.storage.get("role");
    let name = await this.storage.get("name");
    this.name = name;
    this.role = role;
  }

  async getData()
  {
    // const loading = await this.loading.create({});
    // loading.present();
    this.trigger2 = false;
    let kelas = await this.storage.get("id_kelas");
    let token = await  this.storage.get("api_token");
    this.kelas = kelas;
    this.token = token;
   console.log(this.kelas);

   this.http.get(this.api.APIURL + "jadwalPelajaran/today/"+this.kelas).subscribe(data=>{
     this.datas = data;
    //  loading.dismiss();
   
    this.trigger = true;

     console.log(this.datas);
   },(err)=>{this.trigger2 = true;this.failed();})
  }


  async failed()
  {
    const toast = await this.toast.create({
      message:"Tidak Ada Koneksi Internet",
      color:"danger",
      position:"bottom",
      duration:1000
    });

    toast.present();
  }


  goToTugas()
  {
    if(this.role == "Siswa")
    {
      this.nav.navigateForward("tabs/tabs/tugas");
    }
    else
    {
      this.nav.navigateForward("tabs2/tabs2/tugas");
    }
  }

  goToJadwal()
  {
    if(this.role == "Siswa")
    {
      this.nav.navigateForward("tabs/tabs/jadwal");
    }
    else
    {
      this.nav.navigateForward("tabs2/tabs2/jadwal");
    }
  }

  goToSaya()
  {
    if(this.role == "Siswa")
    {
      this.nav.navigateForward("tabs/tabs/akun");
    }
    else
    {
      this.nav.navigateForward("tabs2/tabs2/akun");
    }
  }
}
