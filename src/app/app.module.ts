import { NgHttpLoaderModule } from './_helpers/http-loader.module';
import { AuthGuard } from './_guards/auth.guard';
import { JwtUserService } from './_services/jwt-user.service';
import { AuthUserService } from './_services/auth-user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecipesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule
  ],
  providers: [
    AuthUserService,
    JwtUserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
