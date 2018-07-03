import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatCardModule } from '@angular/material';

import {RouterModule,Routes} from '@angular/router';
import { AuthGuard} from './guard/auth.guard'
import { AppComponent} from './app.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { HomeComponent} from './components/home/home.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ProfileComponent} from './components/profile/profile.component';
import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';
import { NgFlashMessagesModule} from 'ng-flash-messages';
import { ReservationComponent} from './components/reservation/reservation.component';
import { EditreservationComponent } from './components/editreservation/editreservation.component';
import { SearchComponent } from './components/search/search.component';
import { ResetuserComponent } from './components/resetuser/resetuser.component';
import { SummaryComponent } from './components/summary/summary.component';








const appRoutes:Routes = [ 
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'addreservation',component:ReservationComponent,canActivate:[AuthGuard]},
  {path:'editreservation/:id',component:EditreservationComponent,canActivate:[AuthGuard]},
  {path:'search/:labname',component:SearchComponent,canActivate:[AuthGuard]},
  {path:'resetusers',component:ResetuserComponent,canActivate:[AuthGuard]},
  {path:'summary',component:SummaryComponent,canActivate:[AuthGuard]}
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ReservationComponent,
    EditreservationComponent,
    SearchComponent,
    ResetuserComponent,
    SummaryComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule

   
    
    
    
   
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule { }
