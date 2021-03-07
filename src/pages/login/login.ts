import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loader;
  private toast;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private auth: AuthService) {
  }

  
  onSubmit(data) {
    this.presentLoading();
    this.auth.signup(data.email,data.password,data.name)
    .then(() => {
      this.loader.dismiss();
    },
    (err) => {
      this.loader.dismiss();
      this.presentToast(err);
    }
  )
  }
  onIn(data) {
    this.presentLoading();
    this.auth.signIn(data.email,data.password).then(() => {
      this.loader.dismiss();
    },
    (err) => {
      this.loader.dismiss();
      this.presentToast(err);
    }
  )
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
    content: "Signing you in...",
    duration: 3000
  });
  this.loader.present();
}
presentToast(err) {
  this.toast = this.toastCtrl.create({
    message: err,
    duration: 5000,
    position: 'bottom'
  });
  this.toast.present();
}
}
