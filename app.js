var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const authMiddleware = require("./middlewares/authMiddleware.js");
var indexRoute = require("./routes/index");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout.js");
var inboxRouter = require("./routes/inbox");
var composeRouter = require("./routes/compose");
var sentRouter = require("./routes/sent.js");
var emailRouter = require("./routes/emails.js");
var registerRouter = require("./routes/register.js");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(authMiddleware);

app.use("", indexRoute);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/inbox", inboxRouter);
app.use("/compose", composeRouter);
app.use("/sent", sentRouter);
app.use("/email", emailRouter);
app.use("/logout", logoutRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
