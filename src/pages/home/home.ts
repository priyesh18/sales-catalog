import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ind=['orang','jlal','ieflja','jefna'];

  constructor(public navCtrl: NavController) {

  }

}
