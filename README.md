# aec-forge-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Dev Environment


### Functions

1. setup your cloud functions to run locally
see the [help page](https://firebase.google.com/docs/functions/local-emulator)

java can be downloaded [here](https://jdk.java.net/14/). It is required for the emulators

2. configure your environmental variables for 2-leg
see the env [config page](https://firebase.google.com/docs/functions/config-env)

use `forgeapi.client_id and forgeapi.client_secret`

3. run `firebase functions:config:get > .runtimeconfig.json` to extract the firebase config variables into a local config. The file should already be in the .ignore

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
