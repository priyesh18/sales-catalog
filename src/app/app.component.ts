import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import  firebase  from 'firebase';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HomePage } from '../pages/home/home';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private userService: UserService,
    private menuCtrl: MenuController,
    private auth: AuthService) {
    this.initializeApp();
    if (!firebase.apps.length) {
      firebase.initializeApp({apiKey: "AIzaSyC9eYTtyWNtxxjYNJmqPWR00q6zeCjZNMQ",
      authDomain: "triveni-b663b.firebaseapp.com",
      databaseURL: "https://triveni-b663b.firebaseio.com",
      projectId: "triveni-b663b",
      storageBucket: "triveni-b663b.appspot.com",
      messagingSenderId: "640003599792"});
  }
  auth.user$.subscribe(user => {
    if (!user) return; 
    this.rootPage = HomePage;
    userService.save(user);
  }) 
   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.auth.logout();
    this.rootPage = LoginPage;
    this.menuCtrl.close();
  }
}
