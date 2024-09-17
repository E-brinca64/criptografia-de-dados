import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = '';
  email: string = '';
  nota: string = '';
  secretKey: string = '';

  encryptedData: string = '';

  constructor(private navCtrl: NavController) {}

 
  encryptData() {
    if (this.nome && this.email && this.nota && this.secretKey) {
      const data = {
        nome: this.nome,
        email: this.email,
        nota: this.nota
      };

      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
      this.encryptedData = encrypted;
    }
  }

  goToDecryptPage() {
    this.navCtrl.navigateForward('/dados', {
      queryParams: { encryptedData: this.encryptedData }
    });
  }
}
