import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page-404/page-404.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: ContactComponent,
    },
    {
        path: 'home/view/:contactId',
        component: CustomerInfoComponent,
    },
    {
        path: '**',
        component: Page404Component,
    },
];
