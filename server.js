const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
        console.log('Unable to append to server.log')
      }
    });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
//  res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome Message'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Something went wrong. Error * 404 *'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
