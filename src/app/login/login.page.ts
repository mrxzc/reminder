import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import {APIService} from '../../app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email:any;
  password:any;
  data:any=[];

  Subscription;


  constructor(private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private api : APIService,
    private platform:Platform) { }

  ngOnInit() {
  }


  ionViewWillEnter()
  {
    this.Subscription = this.platform.backButton.subscribe(()=>{
       navigator['app'].exitApp();
    })
  }

  ionViewWillLeave()
  {
     this.Subscription.unsubscribe();
  }

  goToRegister()
  {
    this.nav.navigateForward("register");
  }

  ionViewDidLeave()
  {
    this.email = "";
    this.password = "";
  }
  
  async SignIn()
  {
    const loading = await this.loading.create({});

    loading.present();

    let body = new FormData();
    body.append("email", this.email);
    body.append("password", this.password);

    this.http.post(this.api.APIURL + "login/", body).subscribe(data=>{
      this.data  = data;
      console.log(this.data);
      if(this.data == null)
      {
        loading.dismiss();
        this.failed();
      }
      else if(this.data.verif == 0)
      {
        loading.dismiss();
        this.success();
        this.storage.set('api_token',this.data.api_token);
        setTimeout(() => {
           this.nav.navigateRoot("verifikasi");
        }, 900);
      }
      else 
      {
        this.storage.clear();
        loading.dismiss();
        this.success();
        this.storage.set('_id',this.data._id);
        this.storage.set('nis',this.data.nis);
        this.storage.set('name',this.data.name);
        this.storage.set('id_kelas',this.data.id_kelas);
        this.storage.set('email',this.data.email);
        this.storage.set('api_token',this.data.api_token);
        this.storage.set('role',this.data.role);
        this.storage.set('verif',this.data.verif);
        this.storage.set('kelas',this.data.kelas['nama_kelas']);
        this.storage.set('log',1);
        if(this.data.role == "Siswa")
        {
            setTimeout(() => {
              this.nav.navigateRoot("tabs");
            }, 900);
        }
        else
        {
          setTimeout(() => {
            this.nav.navigateRoot("tabs2");
          }, 900);
        }

          
      }

    },(err)=>{loading.dismiss();this.connect();})
  }

  async success()
  {
    const toast = await this.toast.create({
      message:"SIGN IN Sukses",
      color:"success",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 

  async failed()
  {
    const toast = await this.toast.create({
      message:"Username atau Password Salah",
      color:"danger",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 

  async connect()
  {
    const toast = await this.toast.create({
      message:"Tidak Ada Koneksi Internet",
      color:"danger",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 

 

}
