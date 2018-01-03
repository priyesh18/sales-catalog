import { environment } from './../environment/environment';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProductCardComponent } from '../components/product-card/product-card';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';

// export const firebaseConfig = {
//   apiKey: "AIzaSyC9eYTtyWNtxxjYNJmqPWR00q6zeCjZNMQ",
//     authDomain: "triveni-b663b.firebaseapp.com",
//     databaseURL: "https://triveni-b663b.firebaseio.com",
//     projectId: "triveni-b663b",
//     storageBucket: "triveni-b663b.appspot.com",
//     messagingSenderId: "640003599792"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProductCardComponent
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase
  ]
})
export class AppModule {}
