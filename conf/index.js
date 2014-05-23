var conf = {
  site: {
    title: 'Clipr',
    description: 'Add description here',
  },
  styles: [
    {'link':'/css/app.css'},
    {'link':'//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'}
  ]
}
module.exports = function(mode) {
    return conf;
}
