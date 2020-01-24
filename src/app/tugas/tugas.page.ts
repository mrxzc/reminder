import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tugas',
  templateUrl: './tugas.page.html',
  styleUrls: ['./tugas.page.scss'],
})
export class TugasPage implements OnInit {

  datas:any=[];
  datas3:any=[];

  choose:any;

  token:any;
  kelas:any;
  nkelas:any;
  
  fakes:any=[
    {number:1},
    {number:2}
  ];
  trigger:boolean=false;
  trigger2:boolean=false;
  i=1;

  Subscription;
  role:any;
  constructor(private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private api:APIService,
    private platform:Platform,
    private route:Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    // this.getData();
    this.choose = "Tugas";
   
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
    this.getData();
    this.getKegiatan();
  }

  ionViewWillLeave(){
    this.Subscription.unsubscribe();
    this.i = 2;
  }

  async getRole()
  {
    let role = await this.storage.get('role');
    let nkelas = await this.storage.get('kelas');
    this.role = role;
    this.nkelas = nkelas;
  }
  

 
  click()
  {
    this.i++;
  }

  click2()
  {
    this.i = 1;
  }

  

  async getData()
  {
    // const loading = await this.loading.create({});
    // loading.present();
    this.trigger2 = false;
    this.trigger = false;
    let token = await this.storage.get("api_token");
    let kelas = await this.storage.get("id_kelas");
    this.kelas = kelas;
    this.token = token;

     this.http.get(this.api.APIURL + "tugas/"+this.kelas).subscribe(data=>{
          
           this.datas=data;
           console.log(this.datas);
          this.trigger2 = true;    
          this.trigger = true;
        
       
       

     },(err)=>{this.trigger2 = true;this.failed();})
  }

  async getKegiatan()
  {
    // const loading = await this.loading.create({});
    // loading.present();
    this.trigger2 = false;
    this.trigger = false;
    let token = await this.storage.get("api_token");
    let kelas = await this.storage.get("id_kelas");
    this.kelas = kelas;
    this.token = token;

     this.http.get(this.api.APIURL + "tugas/kegiatan/"+this.kelas).subscribe(data=>{
          
           this.datas3=data;
           console.log(this.datas3);
          this.trigger2 = true;    
          this.trigger = true;
        
       
       

     },(err)=>{this.trigger2 = true;this.failed();})
  }


 // if(this.datas[0].data != null)
        // {
        //   for ( let a = 0; a < this.datas[0].data.length; a++) {
        //     this.data2.push(
        //       {"id":this.datas[0].data[a]._id,
        //       "judul":this.datas[0].data[a].judul,
        //       "deskripsi":this.datas[0].data[a].deskripsi,
        //       "mata_pelajaran":this.datas[0].data[a].mata_pelajaran["mata_pelajaran"]
        //     });
        //   }
        //   console.log(this.data2);
        // }


  async failed()
  {
    const toast = await this.toast.create({
      message:"Tidak Ada Koneksi Internet",
      color:"danger",
      position:"bottom",
      duration:1000
    })

    toast.present();
  }
  // *ngFor="let a of datas[0].data[r].mapel['nama']"
  goToDetail(_id)
  {
  this.nav.navigateForward(['detail/',_id]);
  }
 
  goToDetailKegiatan(_id)
  {
  this.nav.navigateForward(['detailkegiatan/',_id]);
  }
}

