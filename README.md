# generator-vile [![Build Status](https://secure.travis-ci.org/amctammany/generator-vile.png?branch=master)](https://travis-ci.org/amctammany/generator-vile)

> Yeoman generator that goes beyond the MEAN stack. Uses MongoDB, Express, Angular, and Stylus and is configured for easy deployment to Heroku. Enables easier directory system by calling subgenerators with groups.

## Usage

Install `generator-vile`:
```
npm install -g generator-vile
```

Make a new directory and `cd` into it:
```
mkdir new-project && cd $_
```

run `yo vile`
```
yo vile
```

Run `grunt` to build and `grunt server` to start local server

## Available generators:

* [vile](#app) (aka [vile:app](#app))
* [vile:controller](#controller)
* [vile:directive](#directive)
* [vile:filter](#filter)
* [vile:route](#route)
* [vile:service](#service)
* [vile:provider](#provider)
* [vile:factory](#factory)
* [vile:class](#class)
* [vile:view](#view)
* [vile:model](#model)


### App
Sets up a new AngularJS app using the MEAN stack. Automatically links to Twitter Bootstrap via CDN.

Example:
```bash
yo vile
```

### Route
Generates a controller and view within an optional group folder. Configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo angular:route posts:show
```

Produces `app/scripts/posts/show.js`:
```javascript
angular.module('myApp').controller('ShowCtrl', function ($scope) {
  $scope.foo = 'foo';
});
```

Produces `app/views/posts/show.html`:
```html
<p>This is the Posts:Show view</p>
```
### Model
Generates a Mongoose document with given parameters. Adds RESTful backend routes to Express server.
RESTful ID defaults to `name` property if exists, else uses `_id`. Can be overridden by `--identifier` option.
Generates Angular $resource for frontend.
Use `:` to attach types to property, default is `String`.

Example:
```bash
yo vile:model post name description date:date ranking:number
```

Produces `db/post.js`
```javascript
//... Dependencies

var PostSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  ranking: Number,
  urlString: String
});

PostSchema.pre('save', function (next) {
  if (this.name) {
    this.urlString = this.name.toLocaleLowerCase().replace(/\s+/g, '-');
  }
  next();
});

mongoose.model('Post', PostSchema);
```

Produces `routes/posts.js`:
```javascript
var mongoose = require('mongoose');

module.exports = function (app) {
  var Post = mongoose.model('Post');

  // GET /posts => Index
  app.get('/posts', function (req, res) {
    Post.find()
      .exec(function (err, posts) {
        if (err) { console.log(err); }
        res.send(posts);
      });
  });

  // GET /posts/id => Show
  app.get('/posts/:id', function (req, res) {
    Post.findOne({urlString: req.params.id})
      .exec(function (err, post) {
        if (err) { console.log(err); }
        res.send(post);
      });
  });

  // DEL /posts/id => Remove
  app.del('/posts/:id', function (req, res) {
    Post.findOneAndRemove({urlString: req.params.id}, function (err, post) {
      if (err) { console.log(err); }
      res.send(post);
    });
  });

  // POST /posts => Create
  app.post('/posts', function (req, res) {
    var post = new Post(req.body);
    post.save(function (err) {
      if (err) { console.log(err); }
      res.send(post);
    });
  });

  // POST /posts/id => Update
  app.post('/posts', function (req, res) {
    Post.findOne({urlString: req.params.id}, function (err, post) {
      if (err) {console.log(err);}
      
      post.name = req.body.name
      
      post.description = req.body.description
      
      post.date = req.body.date
      
      post.ranking = req.body.ranking
      
      post.save(function (err) {
        if (err) { console.log(err); }
        res.send(post);
      });
    });
  });

};
```


### Controller
Generates a controller file within an optional group folder

Example:
```bash
yo vile:controller posts:new
```

Produces `app/scripts/posts/controllers/new.js`:
```javascript
angular.module('myApp').controller('NewCtrl', function ($scope) {
  // ...
});
```

### Directive
Generates a directive file within an optional group folder

Example:
```bash
yo vile:directive posts:details
```

Produces `app/scripts/posts/directives/details.js`:
```javascript
angular.module('myApp').directive('details', function () {

  return {
   template: '<div></div>',
   restrict: 'E',
   link: function postLink(scope, element, attrs) {
    element.text('this is the details directive');
   }
  };
});
```

### Filter
Generates a filter within an optional group folder

Example:
```bash
yo vile:filter groupBy
```

Produces `app/scripts/filters/groupBy.js`:
```javascript
angular.module(myApp).filter('groupBy', function () {
  return function (input) {
    return 'groupBy filter:' + input;
  };
});
```

### View
Generates an HTML view file within an optional group folder

Example:
```bash
yo vile:view posts:new
```

Produces `app/views/posts/new.html`:
```html
<p>This is the Page:View page</p>
```

### Service
Generates an AngularJS service within an optional group folder.

Example:
```bash
yo vile:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myApp').service('myService', function () {
  // ...
});
```


### Add to Index
By default, new scripts are added to index.html.
To skip this behaviour, pass in the skip-add argument:
```bash
yo vile:service serviceName --skip-add
```

## Bower Components
The [app](#app) generator always installs these packages:
* jQuery
* angular
* angular-resource
* angular-route
* angular-cookies
* angular-sanitzie
* angular-mocks
* angular-scenario

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
