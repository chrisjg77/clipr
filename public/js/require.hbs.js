define(function(require) {
  var app = require('app')
    // , conf = require('conf')
    , conf = {}
    , Handlebars = require('handlebars')
    , text = require('text')
    , templates = {}
    , loaded = {}
    , loading = {}
    , namespaces = ['temp']
    , optimized = false
    ;

  if (conf.assets && conf.assets.optimize === 'enabled') {
    optimized = true;
  }
  if (conf.assets && conf.assets.templates) {
    namespaces = Object.keys(conf.assets.templates);
  }

  namespaces.forEach(function (namespace) {
    templates[namespace] = {};
    loaded[namespace] = false;
    loading[namespace] = false;
  });

  var s = /^shared\//;

  var hbs = {
    load: function (name, req, onLoad, config) {

      function loadTemplate (namespace) {
        // Allow the text plugin to fetch the unoptimized templates
        function toTextName (name) {
          var textName;
          if (s.test(name)) {
            textName = name.replace(s, 'shared/templates/') + '.hbs';
          }
          else {
            textName = 'templates/' + name + '.hbs';
          }
          return textName;
        }

        // Try to return cached template.
        if (templates[namespace][name]) {
          return onLoad(templates[namespace][name]);
        }

        // After the text of the template is loaded, we compile and cache it.
        function compile (text) {
          templates[namespace][name] = Handlebars.compile(text);
          onLoad(templates[namespace][name]);
        }

        // Load the template text via the text! plugin.
        text.load(toTextName(name), req, compile, config);
      }

      // Load the precompiled templates?
      namespaces.forEach(function (namespace) {
        if (!loaded[namespace] && optimized && conf.assets.templates[namespace].aggregate) {
          if (!loading[namespace]) {
            loading[namespace] = true;
            require(['assets/templates/' + conf.assets.templates[namespace].hash + '-' + namespace], function (contents) {
              templates[namespace] = contents || {};
              app.trigger('templates:loaded:' + namespace);
              loading[namespace] = false;
              loaded[namespace] = true;
            });
          }
          app.on('templates:loaded:' + namespace, loadTemplate.bind(null, namespace));
        }
        else {
          loadTemplate(namespace);
        }
      });
    },

    // Delegates to the text! plugin.
    // @todo This is used by the optimizer and will probably need to be
    // revisited when we start using it.
    write: text.write,
    writeFile: text.writeFile
  };

  return hbs;
});
