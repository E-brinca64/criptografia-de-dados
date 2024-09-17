import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage {

  secretKey: string = '';
  encryptedData: string = '';
  decryptedData: any = null;
  isObject: boolean = false; 
  isError: boolean = false;  

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.encryptedData = params['encryptedData'];
    });
  }

  decryptData() {
    if (this.encryptedData && this.secretKey) {
      try {
        const bytes = CryptoJS.AES.decrypt(this.encryptedData, this.secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        this.decryptedData = JSON.parse(decrypted);
        this.isObject = typeof this.decryptedData === 'object'; 
        this.isError = false;
      } catch (error) {
        this.decryptedData = 'Erro na descriptografia. Chave incorreta.';
        this.isObject = false;
        this.isError = true;
      }
    }
  }
}
