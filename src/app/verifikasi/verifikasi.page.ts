import { Component, OnInit,  } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { APIService } from '../services/api.service';



@Component({
  selector: 'app-verifikasi',
  templateUrl: './verifikasi.page.html',
  styleUrls: ['./verifikasi.page.scss'],
})
export class VerifikasiPage implements OnInit {


  o1:any;
  o2:any;
  o3:any;
  o4:any;
  o5:any;
  code:any;
  data:any=[];
  token:any;

  constructor(private http:HttpClient,
    private storage:Storage,
    private nav:NavController,
    private toast:ToastController,
    private loading:LoadingController,
    private api : APIService) { }

  ngOnInit() {
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
  }

  ionViewDidLeave()
  {
    this.o1 = "";
    this.o2 = "";
    this.o3 = "";
    this.o4 = "";
    this.o5 = "";
  }

  setFilteredItems1(o1) {
    this.o1= o1.toUpperCase();
  }
  setFilteredItems2(o2) {
    this.o2= o2.toUpperCase();
  }
  setFilteredItems3(o3) {
    this.o3= o3.toUpperCase();
  }
  setFilteredItems4(o4) {
    this.o4= o4.toUpperCase();
  }
  setFilteredItems5(o5) {
    this.o5= o5.toUpperCase();
    this.verify();
  }

 
  async verify()
  {
    
    let result: string = await this.storage.get('api_token');
    this.token = result;
    console.log(this.token);

    this.code = this.o1+this.o2+this.o3+this.o4+this.o5;
    console.log(this.code);

     const loading = await this.loading.create({});
     loading.present();

     let body = new FormData();
     body.append("kode_kelas",this.code);

     this.http.post(this.api.APIURL + "verifikasi/?api_token="+this.token,body).subscribe(data=>{
       this.data = data;
       console.log(this.data);
       if(this.data == null)
       {
        loading.dismiss();
        this.failed();
       }
       else
       {
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
          this.storage.set('log',1);
          setTimeout(() => {
            this.nav.navigateRoot("tabs");
          }, 900);
       }

     },(err)=>{loading.dismiss();this.connect();})
  }


  async failed()
  {
    const toast = await this.toast.create({
      message:"Verifikasi Gagal",
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

  
  async success()
  {
    const toast = await this.toast.create({
      message:"Verifikasi Sukses",
      color:"success",
      position:"bottom",
      duration:1000
    });

    toast.present();
  } 
}
