import { firebaseConfig } from './../environment/environment';
import { CategoryService } from './../services/category.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import  firebase  from 'firebase';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  companys = [];
  private loader;
  types = [
    {name: 'Steel', value: 'steel', checked: false},
    {name: 'Glass', value: 'glass', checked: false}
  ];
  subtypes = [
    {name: 'Single', value: 'single', checked: false},
    {name: 'Double', value: 'double', checked: false},
    {name: 'Triple', value: 'triple', checked: false},
    {name: 'Four', value: 'four', checked: false}
  ];


  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events: Events,
    private loadingCtrl: LoadingController,
    // private userService: UserService,
    private menuCtrl: MenuController,
    private categoryService: CategoryService,
    private auth: AuthService) {
    this.initializeApp();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  auth.user$.subscribe(user => {
    this.loader.dismiss();
    if (!user) return; 
    this.rootPage = HomePage;
    //userService.save(user);
  }) 
   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.presentLoading();
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
 

  onFilter() {
  
  this.events.publish("shareObject",
    this.selectedOptions(this.companys),
    this.selectedOptions(this.types),
    this.selectedOptions(this.subtypes) );
  }
  selectedOptions(myarray) { 
    return myarray
              .filter(opt => opt.checked)
              .map(opt => opt.value)
  }
  ngOnInit() {
     this.categoryService.getAll().map((company: Array<any>) => {
       company.forEach(element => {
        this.companys.push({name: element.name, value:element.$key, checked:false});
       });
     }).subscribe()
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
    content: "Checking user...",
    duration: 3000
  });
  this.loader.present();
}
}
