import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nis:any;
  email:any;
  name:any;
  password:any;
  cpassword:any;
  data:any=[];


  Subscription;

  constructor(private http:HttpClient,
    private api:APIService,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private platform:Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.Subscription = this.platform.backButton.subscribe(()=>{
       this.nav.navigateForward("login");
    })
  }

  ionViewDidLeave()
  {
    this.nis= "";
    this.email= "";
    this.name= "";
    this.password= "";
    this.cpassword= "";
    this.Subscription.unsubscribe();
  }


  async register()
  {
    if(this.cpassword != this.password)
    {
             this.confirm();
    }
    else
    {
            const loading = await this.loading.create({
            });
        
            loading.present();
        
            let body = new FormData();
            body.append("nis",this.nis);
            body.append("email",this.email);
            body.append("name",this.name);
            body.append("password",this.password);

            this.http.post(this.api.APIURL + "register/",body).subscribe(data=>{
              this.data = data;
              if(this.data.nis != null || this.data.email != null)
              {
                loading.dismiss();
                this.failed();
              }
              else
              {
                loading.dismiss();
                this.success();
                setTimeout(() => {
                  this.nav.navigateForward("login");
                }, 900);
              }
        
            },(err)=>{loading.dismiss();this.connect();})
    }

   
  }

  async success()
  {
    const toast = await this.toast.create({
      message:"Registrasi Sukses",
      color:"success",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 

  async failed()
  {
    const toast = await this.toast.create({
      message:"Registrasi Gagal",
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

  
  async confirm()
  {
    const toast = await this.toast.create({
      message:"Password Tidak Sama",
      color:"danger",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 

 
}
