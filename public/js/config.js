/**
 * Configuration for RequireJS.
 */
requirejs.config({
  baseUrl: '/js/',
  paths: {
    // App shortcut.
    'app': 'apps/app',

    // Handlebars template loader/compiler.
    'hbs': 'require.hbs',

    // Paths to static assets.
    'templates': '../templates',
    'assets': '../assets',

    // Vendor libraries.
    'jquery': '../vendor/jquery',
    'transit': '../vendor/jquery.transit',
    'autosize': '../vendor/jquery.autosize',
    'placeholder': '../vendor/jquery.placeholder',
    'underscore': '../vendor/underscore',
    'backbone': '../vendor/backbone',
    'backbone.deep-model': '../vendor/backbone.deep-model',
    'marionette': '../vendor/backbone.marionette',
    'handlebars': '../vendor/handlebars',
    'text': '../vendor/require.text',
    'typeahead': '../vendor/typeahead.jquery',
    'parallax': '../vendor/jquery.parallax',
    'vague': '../vendor/Vague'
  },

  // Shims for non-AMD compatible libraries.
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone.deep-model': {
      deps: ['backbone']
    },
    'marionette': {
      deps : ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'transit': {
      deps: ['jquery']
    },
    'autosize': {
      deps: ['jquery']
    },
    'placeholder': {
      deps: ['jquery']
    },
    'typeahead': {
      deps: ['jquery']
    },
    'parallax': {
      deps: ['jquery']
    },
    'vague': {
      deps: ['jquery']
    }
  }
});
