import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login';
import { LoginFormComponent } from './auth/login-form';
import { SignupComponent } from './auth/signup';
import { Dashboard } from './dashboard';
import { UserList } from './users/user-list/user-list';
import { UserForm } from './users/user-form/user-form';
import { ProductList } from './products/product-list/product-list';
import { ProductForm } from './products/product-form/product-form';
import { OrderList } from './orders/order-list/order-list';
import { OrderForm } from './orders/order-form/order-form';
import { authGuard } from './core/auth-guard';
import { roleGuard } from './core/role-guard';
import { SettingsComponent } from './users/settings/settings.component';
import { UsersPageComponent } from './users/users-page.component';
import { ProductsPageComponent } from './products/products-page.component';
import { OrdersPageComponent } from './orders/orders-page.component';
import { OrderHistoryComponent } from './orders/order-history.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-form', component: LoginFormComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'users', component: UsersPageComponent, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'users/new', component: UserForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'users/:id/edit', component: UserForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsPageComponent, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'products/new', component: ProductForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
  { path: 'orders/new', component: OrderForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'orders/:id/edit', component: OrderForm, canActivate: [authGuard, roleGuard], data: { role: 'Super Admin' } },
  { path: 'order-details/:orderId', component: OrderHistoryComponent, canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
