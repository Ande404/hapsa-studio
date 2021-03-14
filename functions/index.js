const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
var exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const firebaseUser = require("./auth/firebaseUser");

admin.initializeApp();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(firebaseUser.validateToken);
app.set( "views", path.join( __dirname, "views" ) );

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  const user = req.user;

  console.log('Signed-in user:', user);
  return res.status(200).render('home', {
    user: user,
  });
});
exports.myresume = functions.https.onRequest(app);
