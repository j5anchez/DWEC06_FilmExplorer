import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Modulos de la aplicacion
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./routes/app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { PagesModule } from "./pages/pages.module";
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, RegistroComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    FormsModule,
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
