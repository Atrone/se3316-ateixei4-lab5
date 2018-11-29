//imports for the app
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
import { ItemsComponent } from './items/items.component';
import { CartComponent } from './cart/cart.component';
import { DeleteComponent } from './delete/delete.component';
import { CollectionsComponent } from './collections/collections.component';
import { PutComponent } from './put/put.component';
import { DMCAComponent } from './dmca/dmca.component';

//declarations, imports, providers, and bootstrap
@NgModule({
  declarations: [
    AppComponent,
    GetComponent,
    PostComponent,
    ItemsComponent,
    CartComponent,
    DeleteComponent,
    CollectionsComponent,
    PutComponent,
    DMCAComponent
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