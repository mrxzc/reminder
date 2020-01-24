import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'home',
          children:
            [
              {
                path: '',
                loadChildren: '../home/home.module#HomePageModule'
              }
            ]
        },
        {
          path: 'tugas',
          children:
            [
              {
                path: '',
                loadChildren: '../tugas/tugas.module#TugasPageModule'
              }
            ]
        },
        {
          path: 'jadwal',
          children:
            [
              {
                path: '',
                loadChildren: '../jadwal/jadwal.module#JadwalPageModule'
              }
            ]
        },
        {
          path: 'akun',
          children:
            [
              {
                path: '',
                loadChildren: '../akun/akun.module#AkunPageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/tabs/home',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
