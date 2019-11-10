import { KeycloakConfig } from 'keycloak-angular';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const keycloakConfig: KeycloakConfig = {
	url: 'http://localhost:8080/auth',
	realm: 'ecomapp',
	clientId: 'ecom-web',
	credentials: {
		secret: '07798e48-6476-4aac-b4db-f03ae7b47185'
	}
};

export const environment = {
  production: false,
  // Product service URL
  API_URL: 'http://localhost:9901',
  keycloakConfig
};
