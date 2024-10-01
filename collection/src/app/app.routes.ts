import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddInformationComponent } from './add-information/add-information.component';
import { ShowInformationComponent } from './show-information/show-information.component';
import { ShowInformationsComponent } from './show-informations/show-informations.component';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { DeleteInformationComponent } from './delete-information/delete-information.component';

export const routes: Routes = [
  { path: '', redirectTo: '/add-information', pathMatch: 'full' },
  { path: 'add-information', component: AddInformationComponent },
  { path: 'show-information', component: ShowInformationComponent },
  { path: 'show-informations', component: ShowInformationsComponent },
  { path: 'edit-information', component: EditInformationComponent },
  { path: 'delete-information', component: DeleteInformationComponent },
  { path: '**', redirectTo: '/show-information' },
];
