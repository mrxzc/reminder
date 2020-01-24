import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: 'tabs2',
    component: Tabs2Page,
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
          path: 'add',
          children:
            [
              {
                path: '',
                loadChildren: '../add/add.module#AddPageModule'
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
          redirectTo: '/tabs2/tabs2/home',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs2/tabs2/home',
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
  declarations: [Tabs2Page]
})
export class Tabs2PageModule {}
