const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { mongoURI, cookieKey } = require("./config/keys.js");
/// Uses Models Folder with Users File
require("./models/User.js");
/// Uses Passport File
require("./services/passport.js");

mongoose.connect(mongoURI);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes.js")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Working on PORT " + PORT));
