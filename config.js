var config = {
  development: {

  },
  production: {
    database: {},
    libJS: [
      '/lib/jquery.js',
      '/lib/underscore.js',
      '/lib/backbone.js',
      '/lib/handlebars.js'
    ],
    clientJS: [
      '/dist/built.min.js'
    ],
    clientCSS: 'style.min.css'
  },
  default: {
    database: {},
    libJS: [
      '/lib/jquery.js',
      '/lib/underscore.js',
      '/lib/backbone.js',
      '/lib/handlebars.js'
    ],
    clientJS: [
      '/client/app.js',
      '/client/createLinkView.js',
      '/client/link.js',
      '/client/links.js',
      '/client/linksView.js',
      '/client/linkView.js',
      '/client/router.js'
    ],
    clientCSS: 'style.css'
  }
}

exports.get = function get(env){
    return config[env] || config.default;
}
