// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	API_URL: 'http://localhost:9901/api/v1/',
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5'
};
