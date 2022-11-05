import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from 'src/app/components/header/header.module';
import { AddOrUpdateComponent } from './add-or-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  { path: '', component: AddOrUpdateComponent },
];

@NgModule({
  declarations: [
    AddOrUpdateComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class AddOrUpdateModule { }
