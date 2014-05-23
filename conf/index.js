var conf = {
  site: {
    title: 'Clipr',
    description: 'Clipr is a simple interface for creating short video loops to use for HTML5 backgrounds.',
  },
  styles: [
    {'link':'/css/app.css'},
    {'link':'//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'}
  ]
}
module.exports = function(mode) {
    return conf;
}
