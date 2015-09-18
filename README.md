# mongodb-sanitize

Similar to https://www.npmjs.com/package/mongo-sanitize but is packaged as a middleware and does recursive sanitization for multi-level objects. 

```
var sanitizeMW = require('mongodb-sanitize');

app.use(bodyParser.json());
app.use(sanitizeMW);
```

```
req.body = { title: { $gt: "" } };
// middleware runs
// req.body is now { title: {} }
Posts.find(req.body, function (err, posts) {
  // safe!
});
```

When the middleware encounters an dangerous req.body, it will throw an error: 
    
    {
      name: 'invalid character in key',
      key: key
    }