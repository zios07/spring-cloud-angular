import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {

  constructor() { }

  private keycloakAuth: any;
  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: 'http://localhost:8080/auth',
        realm: 'ecomapp',
        clientId: 'ecom-web',
        credentials: {
          secret: '07798e48-6476-4aac-b4db-f03ae7b47185'
        }
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    let token = this.keycloakAuth.token;
    console.log(token);
    return token;
  }


}
