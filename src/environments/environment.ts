// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDwOiOBx6H-8VMgYCS1UU5CmtM-9-Yo-hA',
    authDomain: 'ks-components.firebaseapp.com',           // todo - check how can auth to another firebase
    databaseURL: 'https://ks-components.firebaseio.com',
    projectId: 'ks-components',
    storageBucket: 'ks-components.appspot.com',
    messagingSenderId: '1039813067985'
  }
};
