import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { ResultComponent } from "./components/result/result.component";
import { InfoComponent } from "./components/info/info.component";
import { SearchComponent } from "./components/search/search.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { PlyrModule } from "ngx-plyr";
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  blur: 5,
  delay: 0,
  fgsSize: 0,
  pbColor: "#0d9488",
  pbDirection: PB_DIRECTION.leftToRight,
};

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    InfoComponent,
    SearchComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PlyrModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    NgxUiLoaderHttpModule,
  ],
  providers: [ResultComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
