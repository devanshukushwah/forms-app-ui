import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
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
    return this.keycloak
      .init({
        onLoad: 'check-sso', // Do NOT force login on app load
        checkLoginIframe: false,
      })
      .then((authenticated) => authenticated)
      .catch(() => false);
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }
}
