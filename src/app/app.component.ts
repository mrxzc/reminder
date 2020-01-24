import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  log:any;
  role:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav:NavController,
    private storage:Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#8162CA');
      this.splashScreen.hide();
        this.get();
    });
  }

  async get()
  {
     
    let log = await this.storage.get('log');
    let role = await this.storage.get('role');
    this.log = log;
    this.role = role;
  
    if(this.log == 1 && this.role == "Siswa")
    {
       this.nav.navigateRoot("tabs");
    }
    else if(this.log == 1 && this.role == "Admin Kelas")
    {
       this.nav.navigateRoot("tabs2");
    }
    else
    {
       this.nav.navigateRoot("login");
    }
  }
}
