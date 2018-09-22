import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { HomeComponent } from './home/home.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'bucketlist',
        component: BucketlistComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bucketlist/:id',
        component: BucketlistDetailComponent,
        canActivate: [AuthGuard]
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
    imports: [ CommonModule, RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [CommonModule, RouterModule],
    providers: [],
})
export class AppRoutingModule {}
