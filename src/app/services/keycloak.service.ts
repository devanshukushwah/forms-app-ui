import { Injectable } from '@angular/core';
import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloakURL,
      realm: 'makeitcoder',
      clientId: 'public-client-forms-app',
    });
  }

  init(): Promise<boolean> {
    return this.keycloak.init({
      checkLoginIframe: false,
    });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }

  login(options?: KeycloakLoginOptions): void {
    this.keycloak.login(options);
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }
}
