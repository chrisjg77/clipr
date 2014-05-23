define(function (require) {
  var Handlebars = require('handlebars');

  // Check if a variable is equal to a value.
  Handlebars.registerHelper('is', function (variable, value, options) {
    if (variable === value) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // If the current select list option matches the value return selected markup.
  Handlebars.registerHelper('selected', function (option, value) {
    option = Array.isArray(option) ? option : [option];

    if (option.indexOf(value) !== -1) {
      return new Handlebars.SafeString(' selected="selected"');
    }
    return '';
  });
});
