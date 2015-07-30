var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var mongoose = require('mongoose');

var mongo = require('../mongo');
var User = mongo.User;
var Link = mongo.Link;
// var db = require('../app/config');
// var User = require('../app/models/user');
// var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');


exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find({}, function(err, links) {
    if (err) throw err;
    console.log(links);
    res.send(200, links);
  })
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;
  console.log(uri);
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }
  Link.findOne({url: uri}, function(err, link){
    if (err) throw err;
      if (link) {
        res.send(200, link); 
      } else {
        util.getUrlTitle(uri, function(err, title) {
          if (err) {
            return res.send(404);
          }
          var code = crypto.createHash('sha1').update(uri).digest('hex').slice(0,5);
          Link.create({url: uri, title: title, base_url: req.headers.origin, code: code}, function(err, newLink) {
            if (err) throw err;
            res.send(200, newLink);
          });
        });
      }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      res.redirect('/login');
    } else if (user.password === password) {
      // Successful login
      util.createSession(req, res, user);
    } else {
      res.redirect('/login');
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      // Create new user
      User.create({
        username: username,
        password: password
      }, function(err, newUser) {
        if (err) {
          throw err;
        }
        util.createSession(req, res, newUser);
      });
    } else {
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0]}, function(err, link){
    if (err) throw err;
    if (!link) {
      res.redirect('/');
    } else {
      link.update({visits:link.visits+1}, function(err){
        if (err) throw err;
        return res.redirect(link.url);
      });
    }
  });

};