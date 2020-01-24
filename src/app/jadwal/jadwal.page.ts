import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-jadwal',
  templateUrl: './jadwal.page.html',
  styleUrls: ['./jadwal.page.scss'],
})
export class JadwalPage implements OnInit {

  datas:any=[];
  fakes:any=[
    {number:1},
    {number:2}
  ];
  kelas:any;
  token:any;
  trigger:boolean=false;
  trigger2:boolean=false;
 
  Subscription;
  role:any;

  constructor(private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private api:APIService,
    private platform:Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    // this.getData();
    this.getData();
    this.getRole();
    this.Subscription = this.platform.backButton.subscribe(() => {
        if(this.role == "Siswa")
        {
          this.nav.navigateForward("/tabs/tabs/home");
        }
        else if(this.role == "Admin")
        {
          this.nav.navigateForward("/tabs2/tabs2/home");
        }
    })
  }

  ionViewWillLeave(){
    this.Subscription.unsubscribe();
  }

  async getRole()
  {
    let role = await this.storage.get('role');
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

   this.http.get(this.api.APIURL + "jadwalPelajaran/"+this.kelas).subscribe(data=>{
     this.datas = data;
    //  loading.dismiss();
    this.trigger = true;
     this.trigger2 = true;
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


  // async getData()
  // {
 

  //   let kelas = await this.storage.get("id_kelas");
  //   let token = await  this.storage.get("api_token");
  //   this.kelas = kelas;
  //   this.token = token;

  //  this.http.get(this.api.APIURL + "jadwalPelajaran/"+this.kelas+"/?api_token="+this.token).subscribe(data=>{
  //    this.data = data;
  //    console.log(this.data);
  //  })
  // }

  //   {
//     hari:"SELASA",
//     data:[
//       {
//         awal:"10.00 AM",
//         akhir:"11.00 AM",
//         mapel:"B.inggris",
//         ruang:"Ruang 7"
//       },
//       {
//         awal:"10.00 AM",
//         akhir:"11.00 AM",
//         mapel:"B.inggris",
//         ruang:"Ruang 7"
//       },
//       {
//         awal:"10.00 AM",
//         akhir:"11.00 AM",
//         mapel:"B.inggris",
//         ruang:"Ruang 7"
//       }
//     ]
 
// },

// {
//   hari:"RABU",
//   data:[
//     {
//       awal:"10.00 AM",
//       akhir:"11.00 AM",
//       mapel:"B.inggris",
//       ruang:"Ruang 7"
//     },
//     {
//       awal:"10.00 AM",
//       akhir:"11.00 AM",
//       mapel:"B.inggris",
//       ruang:"Ruang 7"
//     },
//     {
//       awal:"10.00 AM",
//       akhir:"11.00 AM",
//       mapel:"B.inggris",
//       ruang:"Ruang 7"
//     }
//   ]

// }
  
//     ];

  

}
