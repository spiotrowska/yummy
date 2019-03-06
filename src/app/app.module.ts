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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SettingsComponent } from './settings/settings.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RecipesComponent,
		DashboardComponent,
		HeaderComponent,
		FooterComponent,
		PublicComponent,
		PrivateComponent,
		IngredientsComponent,
		SettingsComponent,
		RecipeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgHttpLoaderModule,
		NgbModule.forRoot()
	],
	providers: [
		AuthUserService,
		JwtUserService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
