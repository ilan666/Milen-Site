import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { CategoryComponent } from './pages/category/category.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'category', component: CategoryComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product', component: EditProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
