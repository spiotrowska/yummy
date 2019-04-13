import { NotificationOptions } from './_helpers/notification.options';
import { DeleteRecipeModalComponent } from './recipes/delete-recipe-modal/delete-recipe-modal.component';
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
import { DashboardRecipesComponent } from './dashboard-recipes/dashboard-recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { SettingsComponent } from './settings/settings.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { UserRecipesComponent } from './recipes/user-recipes/user-recipes.component';
import { RecipesListViewComponent } from './shared/recipes-list-view/recipes-list-view.component';
import { UserRecipeComponent } from './recipes/user-recipe/user-recipe.component';
import { RecipeFormComponent } from './shared/recipe-form/recipe-form.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailsViewComponent } from './shared/recipe-details-view/recipe-details-view.component';
import { RecipeRatingsComponent } from './shared/recipe-ratings/recipe-ratings.component';
import { RecipeRatingFormComponent } from './shared/recipe-ratings/recipe-rating-form/recipe-rating-form.component';
import { AddRecipeRatingFormComponent } from './shared/recipe-ratings/add-recipe-rating-form/add-recipe-rating-form.component';
import { DashboardRecipeComponent } from './dashboard-recipe/dashboard-recipe.component';
import { FileDropModule } from 'ngx-file-drop';
import { RecipePhotoPreviewComponent } from './shared/recipe-form/recipe-photo-preview/recipe-photo-preview.component';
import { NotifierModule } from 'angular-notifier';
import { RecipesFilterComponent } from './recipes/recipes-filter/recipes-filter.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RecipesComponent,
		DashboardRecipesComponent,
		HeaderComponent,
		FooterComponent,
		PublicComponent,
		PrivateComponent,
		SettingsComponent,
		RecipeComponent,
		AddRecipeComponent,
		UserRecipesComponent,
		RecipesListViewComponent,
		UserRecipeComponent,
		RecipeFormComponent,
		EditRecipeComponent,
		RecipeDetailsViewComponent,
		DeleteRecipeModalComponent,
		RecipeRatingsComponent,
		RecipeRatingFormComponent,
		AddRecipeRatingFormComponent,
		DashboardRecipeComponent,
		RecipePhotoPreviewComponent,
		RecipesFilterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgHttpLoaderModule,
		NgbModule.forRoot(),
		ReactiveFormsModule,
		FileDropModule,
		NotifierModule.withConfig(NotificationOptions)
	],
	providers: [
		AuthUserService,
		JwtUserService,
		AuthGuard
	],
	bootstrap: [AppComponent],
	entryComponents: [DeleteRecipeModalComponent]
})
export class AppModule { }
