import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetComponent } from './get/get.component';
import { PostComponent } from './post/post.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    GetComponent,
    PostComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyCHLnn1Jf-OC-NJGyPSXJy0MXBbIzkQJjU",
    authDomain: "se3316-ateixei4-lab5.firebaseapp.com",
    databaseURL: "https://se3316-ateixei4-lab5.firebaseio.com",
    projectId: "se3316-ateixei4-lab5",
    storageBucket: "se3316-ateixei4-lab5.appspot.com",
    messagingSenderId: "255688483985"
  }),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }