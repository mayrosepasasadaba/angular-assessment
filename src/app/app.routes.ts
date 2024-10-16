import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page-404/page-404.component';

export const routes: Routes = [
    // {
    //     path: '/home',
    //     component: ContactComponent,
    // },
    {
        path: '',
        component: ContactComponent,
    },
    {
        path: '**',
        component: Page404Component,
    },
];
