import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { APIService } from '../services/api.service';


@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})
export class AkunPage implements OnInit {


  nama:any;
  email:any;
  role:any;
  Subscription;
  constructor(
    private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private alert:AlertController,
    private api:APIService,
    private platform:Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.getData();
    this.Subscription =  this.platform.backButton.subscribe(() => {    
      
      if(this.role == "Siswa")
      {
        this.nav.navigateForward("/tabs/tabs/home");
      }
      else if(this.role == "Admin")
      {
        this.nav.navigateForward("/tabs2/tabs2/home");
      }
    
    });
  }

  ionViewWillLeave()
  {
    this.Subscription.unsubscribe();
  }

  async getData()
  {
    let nama = await this.storage.get("name");
    let email = await this.storage.get("email");
    let role = await this.storage.get("role");
    this.role = role;

      
      let upper = nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
      });

      let upper2 = email.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

      this.nama = upper;
      this.email = upper2;

  }

  async logout()
  {
    const alert = await this.alert.create({
      header: 'Konfirmasi!',
      message: 'Apakah Anda Ingin Keluar Dari Akun Ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.clear();
            this.nav.navigateRoot("login");
          }
        }
      ]
    });

    await alert.present();
  }

}
