/*
 *
 *  declantyson/2017
 *  Declan Tyson
 *  v0.1.0
 *  27/03/2017
 *
 */

const package = require('./package.json'),
      http = require('http'),
      pug = require('pug'),
      fs = require('fs'),
      express = require('express'),
      MarkdownIt = require('markdown-it'),
      app = express(),
      port = process.env.PORT || 1234;

app.set('view engine', 'pug');

app.use("/assets", express.static('assets'));
app.use("/css", express.static('css'));
app.use("/data", express.static('data'));
app.use("/scripts", express.static('scripts'));

const getScripts = () => {
    let dirContents = fs.readdirSync('scripts'),
        files = [];
    for(let i = 0; i < dirContents.length; i++) {
        let file = dirContents[i],
            stat = fs.statSync(`scripts/${file}`);

        if(!stat.isDirectory()) files.push(`/scripts/${file}`);
    }

    return files;
};

app.get('/', function(req,res) {
    res.render('index', {
        'package': package,
        'scripts': getScripts()
    });
});

app.get('/blog/:slug', function(req,res) {
    let md = new MarkdownIt(),
        file = `views/content/blogs/${req.params.slug}.md`;

    fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
            console.error(err);
            content = "# 404 \n ###### Page not found \n Sorry about that. Please check out the rest of the site!"
            res.status(404);
        }
        res.render("view-blog", {
            'package': package,
            'scripts': getScripts(),
            'content': md.render(content)
        });
    });
});

app.get('/blog', function(req,res) {
    let blogs = [];

    fs.readdir('views/content/blogs/', (err, files) => {
       if(err) throw err;
       files.forEach((file) => {
           let md = new MarkdownIt(),
               content = fs.readFileSync(`views/content/blogs/${file}`, 'utf-8');

           let rendered = md.render(content),
               titleStartIndex = rendered.indexOf("<h1>") + 4,
               dateStartIndex = rendered.indexOf("<h4>") + 4,
               titleEndIndex = rendered.indexOf("</h1>") ,
               dateEndIndex = rendered.indexOf("</h4>") ,
               blogTitle = rendered.substring(titleStartIndex, titleEndIndex),
               blogDate = rendered.substring(dateStartIndex, dateEndIndex),
               blog = {
                   url: `/blog/${file.replace('.md', '')}`,
                   title: blogTitle,
                   date: blogDate
               };

           blogs.push(blog);
       });

       blogs = blogs.sort(function(a,b){
           a = Date.parse(a.date.replace(/(\d{1,2})[a-z]{2}\b/i, ''));
           b = Date.parse(b.date.replace(/(\d{1,2})[a-z]{2}\b/i, ''));
           return a>b ? -1 : a<b ? 1 : 0;
       });

        res.render('blog', {
            'package': package,
            'scripts': getScripts(),
            'blogs' : blogs
        });
    });
});

app.get('/:template', function(req,res) {
    res.render(req.params.template, {
        'package': package,
        'scripts': getScripts()
    });
});

http.createServer(app).listen(port);

console.log(`App running on ${port}`);