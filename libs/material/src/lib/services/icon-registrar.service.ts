import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { getTypes } from '@thirty/api-interfaces'

export const BASE_URL = "/assets/";
export const BASE_URL_TYPES = BASE_URL + 'type-icons/';

@Injectable({
  providedIn: 'root'
})
export class IconRegistrarService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  registerSVGs(): void{
    this.matIconRegistry.addSvgIcon('health', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "cardiogram.svg"));
    this.matIconRegistry.addSvgIcon('attack', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "swords.svg"));
    this.matIconRegistry.addSvgIcon('defense', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "security.svg"));
    this.matIconRegistry.addSvgIcon('speed', 
      this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + "flash.svg"));

    getTypes.forEach((type) =>
      this.matIconRegistry.addSvgIcon(type, 
        this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL_TYPES + type + ".svg"))
    )

  }
}
