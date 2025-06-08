import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //provideRouter(
    //[
    //  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ Redirect root to login
    //  { path: 'login', component: LoginComponent },
    //  { path: 'dashboard', component: DashboardComponent},
    //  {path: 'dashboard/users', component: UsersComponent}
    //]
    //),
    //provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor // 👈 must be registered AFTER authInterceptor
      ])
    ),
    importProvidersFrom(FormsModule) // ✅ Add this line to enable [(ngModel)]
  ]
};
