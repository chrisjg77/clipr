define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , FormView = require('views/form')
    , signCount = require('signCount')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  // App-level plugins.
  require('plugins/blur');
  require('plugins/parallax');
  require('plugins/google');
  require('plugins/facebook');

  var ActionsView = Marionette.ItemView.extend({
    template: require('hbs!actions'),

    ui: {
      facebookSign: 'a.fb-sign',
      showForm: 'a.show-form',
      facebookShare: 'a.fb-share',
      twitterShare: 'a.twitter-share'
    },

    events: {
      'click @ui.facebookSign': 'onClickFacebook',
      'click @ui.showForm': 'onClickShowForm',
      'click @ui.facebookShare': 'onClickFacebookShare',
      'click @ui.twitterShare': 'onClickTwitterShare'
    },

    templateHelpers: function () {
      return {
        conf: conf,
        isNew: this.model.isNew(),
        signCount: Number(signCount),
        url: window.location.href
      };
    },

    onClickFacebook: function (e) {
      var self = this;
      e.preventDefault();

      // Fetch their profile. Will prompt for login/auth first if needed.
      app.facebook.getProfile(function (profile) {
        var location = (profile.location && profile.location.name) ? profile.location.name : null
          , hometown = (profile.hometown && profile.hometown.name) ? profile.hometown.name : null
          , query = location || hometown || ''
          ;

        // Instantiate model values.
        var values = {
          facebook_id: profile.id,
          first: profile.first_name,
          last: profile.last_name,
          email: profile.email,
          avatar: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
          address: {}
        };

        // Get address parts from Google.
        app.google.geocode(query, function (err, result) {
          // Log the error, but no need to bail.
          if (err) app.trigger('error', err);

          // Override values with geocoded result.
          _(result).forEach(function (val, key) {
            values.address[key] = val;
          });

          // Don't override address if it's empty.
          if (_.isEmpty(values.address)) {
            delete values.address;
          }

          // Edge-case: sometimes FB doesn't return email, show form.
          if (!values.email) {
            self.model.set(values);
            return self.showForm(new FormView({model: self.model}));
          }

          // Save FB signer and show the form.
          self.model.save(values, {
            wait: true,
            success: function () {
              self.showForm(new FormView({model: self.model, step: 2}));
            },
            error: function (model, xhr) {
              var errors;
              if (xhr.responseJSON && xhr.responseJSON.errors) {
                errors = xhr.responseJSON.errors;
              }
              app.trigger('error', new Error('Unable to sign with Facebook.'), errors);
            }
          });
        });
      });
    },

    onClickShowForm: function (e) {
      e.preventDefault();
      this.showForm(new FormView({model: this.model}));
    },

    showForm: function (formView) {
      // Do the blur, etc.
      app.blur.blurMap();
      app.parallax.disable();
      $('body').scrollTop(0);
      this.$('.actions').removeClass('fadeInDown').addClass('fadeOutDown');

      // Render the form view.
      app.form.show(formView);
    },

    onClickFacebookShare: function (e) {
      e.preventDefault();
      app.facebook.share();
    },

    onClickTwitterShare: function (e) {
      e.preventDefault();

      // Twitter's widgets.js handles all the tweet popup logic automatically
      // based on href.
    }
  });

  return ActionsView;
});
