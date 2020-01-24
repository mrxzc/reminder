import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tugas', loadChildren: './tugas/tugas.module#TugasPageModule' },
  { path: 'akun', loadChildren: './akun/akun.module#AkunPageModule' },
  { path: 'jadwal', loadChildren: './jadwal/jadwal.module#JadwalPageModule' },
  { path: 'verifikasi', loadChildren: './verifikasi/verifikasi.module#VerifikasiPageModule' },
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'tabs2', loadChildren: './tabs2/tabs2.module#Tabs2PageModule' },
  { path: 'add-tugas', loadChildren: './add-tugas/add-tugas.module#AddTugasPageModule' },
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'detailkegiatan/:id', loadChildren: './detailkegiatan/detailkegiatan.module#DetailkegiatanPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
