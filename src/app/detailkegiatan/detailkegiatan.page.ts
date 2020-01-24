import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailkegiatan',
  templateUrl: './detailkegiatan.page.html',
  styleUrls: ['./detailkegiatan.page.scss'],
})
export class DetailkegiatanPage implements OnInit {

  id:any;
  datas:any=[];

fakes:any=[
  {number:1}
];

  trigger:boolean=false;
  trigger2:boolean=false;
  
  Subscription;
  role:any;

  constructor(  private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private api:APIService,
    private route:ActivatedRoute,
    private platform:Platform) { }

 

  ngOnInit() {
  }

  ionViewWillEnter()
  {
      this.getRole();
      this.getData();
      this.Subscription = this.platform.backButton.subscribe(() => {

        if(this.role == "Siswa")
        {
          this.nav.navigateForward("/tabs/tabs/tugas");
        }
        else if(this.role == "Admin")
        {
          this.nav.navigateForward("/tabs2/tabs2/tugas");
        }
      
      })
  }

  ionViewWillLeave()
  {
    this.Subscription.unsubscribe();
  }

  async getRole()
  {
    let role = await this.storage.get('role');
    this.role = role;
  }

  async getData()
  {

  
    this.trigger2 = false;

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

     this.http.get(this.api.APIURL + "tugas/detailKegiatan/"+this.id).subscribe(data=>{
        this.datas = data;
        console.log(this.datas);
        this.trigger = true;
        this.trigger2 = true
     },(err)=>{this.failed();  this.trigger2 = true;  })
  }

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

}
