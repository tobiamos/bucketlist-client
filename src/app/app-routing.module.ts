import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { HomeComponent } from './home/home.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';

export const appRoutes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'bucketlist',
        component: BucketlistComponent
    },
    {
        path: 'bucketlist/:id',
        component: BucketlistDetailComponent
    },
    {
        path: 'home',
        component:  HomeComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [ CommonModule, RouterModule.forRoot(appRoutes) ],
    exports: [CommonModule, RouterModule],
    providers: [],
})
export class AppRoutingModule {}
