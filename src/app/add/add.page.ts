import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';
import * as moment from 'moment';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  // mydate = new Date().toISOString();
   datass:any=[];
  datas:any=[
    // {
    //   data:{
    //     guru:[
    //       {
    //         id:"312739823",
    //         nama:"Abid"
    //       },
    //       {
    //         id:"3123",
    //         nama:"Budi"
    //       },
    //       {
    //         id:"3111111",
    //         nama:"Andri"
    //       }
    //     ], 
    //     mata_pelajaran:[
    //         {
    //           id:"3213123",
    //           mata_pelajaran:"hudsahdisa"
    //         },
    //         {
    //           id:"32213",
    //           mata_pelajaran:"hucdsf"
    //         },
    //         {
    //           id:"111123",
    //           mata_pelajaran:"huuiu"
    //         }
    //     ]
    //   }
    // }
        
  ];

  datas2:any=[];

  dateS:any;
  timeS:any;
  
  Subscription;
  role:any;
  kelas:any;
  nkelas:any;

  mapel:any=null;
  guru:any=null;
  date:any;
  time:any;
  judul:any;
  deskripsi:any;
  menu:any;
  category:any;

 gmapel:any;
 gguru:any;
 
  
  trigger:boolean=false;

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
     this.category = "Tugas"  

     this.getRole();
     this.getForm();
    
     this.Subscription =  this.platform.backButton.subscribe(() => {    
         this.nav.navigateForward("/tabs2/tabs2/home");
     });

   
  }

  ionViewWillLeave()
  {
    this.Subscription.unsubscribe();
  }

  dateChanged(date)
  {
    console.log(date.detail.value)
    this.date = date.detail.value
    this.dateS = moment(this.date).format('MM/DD/YYYY');
    console.log(this.dateS);
  }

  timeChanged(time)
  {
    console.log(time.detail.value)
    this.time = time.detail.value
    this.timeS = moment(this.time).format('hh:mm A');
    console.log(this.timeS);
  }


  async getRole()
  {
    let role = await this.storage.get('role');
    let kelas = await this.storage.get('id_kelas');
    let nkelas = await this.storage.get('kelas');
    this.role = role;
    this.kelas = kelas;
    this.nkelas = nkelas;
  }

  tambah()
  {
  

    console.log(this.judul)
    console.log(this.deskripsi)
    console.log(this.mapel)
    console.log(this.guru)
    console.log(this.kelas)
    console.log(this.role)
    console.log(this.dateS)
    console.log(this.timeS)
    
  }

  async getForm()
  {
    const loading = await this.loading.create({});
    loading.present();
    this.http.get(this.api.APIURL + "tugas/tugasForm/"+ this.kelas).subscribe(data => {
      this.datass = data;
      console.log(this.datass);
     
      this.gmapel = this.datass['data'].mata_pelajaran;
      this.gguru = this.datass['data'].guru;
      console.log(this.gmapel);
      console.log(this.gguru);
      this.trigger = true
      loading.dismiss();

    },(err)=>{
      loading.dismiss();
    })
  }

  async addTugas()
  {
    const loading = await this.loading.create({});
    loading.present();

    let a = new FormData();
    a.append('id_mata_pelajaran',this.mapel);
    a.append('id_guru', this.guru);
    a.append('judul',this.judul);
    a.append('deskripsi',this.deskripsi);
    a.append('category',"Tugas");
    a.append('deadline_date',this.dateS);
    a.append('deadline_time',this.timeS);

    this.http.post(this.api.APIURL + "tugas/store/" + this.kelas ,a).subscribe(data =>{
      this.datas2 = data;
      loading.dismiss();
      this.clear();
      this.success();
    
    },(err)=>{
      this.failed();
      loading.dismiss();
    })
  }

  async addKegiatan()
  {
    const loading = await this.loading.create({});
    loading.present();

    let a = new FormData();
    a.append('judul',this.judul);
    a.append('deskripsi',this.deskripsi);
    a.append('category',"Kegiatan");
    a.append('date',this.dateS);

    this.http.post(this.api.APIURL + "tugas/storeKegiatan/" + this.kelas ,a).subscribe(data =>{
      this.datas2 = data;
      loading.dismiss();
      this.clear();
      this.success();
    
    },(err)=>{
      this.failed();
      loading.dismiss();
    })
  }

  // async get()
  // {
  //   this.http.get(this.api.APIURL + "menu/get").subscribe(data => {
  //     this.datas = data;
  //   })
  // }


  async success()
  {
    const toast = await this.toast.create({
      message:"Sukses Menambah Tugas",
      duration:1000,
      color:"success",
      position:"bottom"
    })

    toast.present();
    setTimeout(() => {
      this.nav.navigateForward("tabs2/tabs2/tugas");
    }, 1000);
    
  }

  async failed()
  {
    const toast = await this.toast.create({
      message:"Gagal Menambah Tugas",
      duration:1000,
      color:"danger",
      position:"bottom"
    })

    toast.present();
  }

  clear()
  {
    this.mapel = "";
    this.guru = "";
    this.judul = "";
    this.deskripsi = "";
    this.date = "";
    this.time = "";


  }
  



}
