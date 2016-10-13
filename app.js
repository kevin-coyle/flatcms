const express     = require('express');
const app         = express();
const MarkdownIt  = require('markdown-it');
const fs          = require('fs');
const fm          = require('front-matter');
const Twig        = require('twig'),
      twig = Twig.twig;


md = new MarkdownIt();
app.set('views', __dirname + '/themes/beagle');
app.set('view engine', 'twig');

// This section is optional and can be used to configure twig.
app.set('twig options', {
    strict_variables: false
});


app.get('/', function(req, res){
    var markdown = fs.readFileSync('./content/index.md').toString();
    var fmContent = fm(markdown);
    var content = md.render(fmContent.body);
    res.render(fmContent.attributes.theme, {
        content : content,
        title: fmContent.attributes.title
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
