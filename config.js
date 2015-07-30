var config = {
  production: {
    database: 'mongodb://MongoLab-3:TuLrlhLSrnMFEgqocNBGEX_M7DboVrHyyGzej_621Xg-@ds036638.mongolab.com:36638/MongoLab-3',
    libJS: [
      'dist/lib/jquery.min.js',
      'dist/lib/underscore.min.js',
      'dist/lib/backbone.min.js',
      'dist/lib/handlebars.min.js'
    ],
    clientJS: [
      '/dist/built.min.js'
    ],
    clientCSS: 'style.min.css'
  },
  default: {
    database: 'mongodb://localhost:27017/shortly',
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
