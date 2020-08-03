'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'emtasks',
    environment,
    firebase: {
      apiKey: "AIzaSyA7FKNgeqxAZPnu-_mW2ePgEJ6fjFjOxEw",
      authDomain: "emtasks-1.firebaseapp.com",
      databaseURL: "https://emtasks-1.firebaseio.com",
      projectId: "emtasks-1",
      storageBucket: "emtasks-1.appspot.com",
      messagingSenderId: "603372330480",
      appId: "1:603372330480:web:ca0e8d890befe7bb571135",
      measurementId: "G-8MK81QZGND"
    },
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
