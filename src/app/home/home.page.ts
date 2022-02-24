import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  profile = null;

  constructor(
    private authService: AuthService, private router: Router,
    private avatarService: AvatarService, private loadingControler: LoadingController,
    private alertController: AlertController
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
      console.log('profile', this.profile);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if(image) {
      const loading = await this.loadingControler.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      await loading.dismiss();

      if(!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploding your avatar',
          buttons: (['OK'])
        });
        await alert.present();
      }
    }
  }
}
