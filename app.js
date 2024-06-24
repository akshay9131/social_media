const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const path = require("path");
const api = require('./src/routes')

app.set("views", path.join(__dirname, 'src',"views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cookieParser())

app.use('/',api);




app.listen(port, () => {
    console.log("listening port " + port);
})