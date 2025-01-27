const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

// const url = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;



main()
  .then(() => {
    console.log("Connected to Mongodb Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto: {
    secret: process.env.SECRET, 
  },
  touchAfter: 24 * 3600,
})

store.on("error", () => {
  console.log("Error in Mongo Session Store", err);
})

const sessionOptions = ({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
})




// Session Middlewares
app.use(session(sessionOptions));
app.use(flash());

// Passport Middlewares: For Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const Strategy = require("passport-local");

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "rishi@gmail.com",
    username: "rishidubey"  
  });

  let registeredUser = await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
})

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Handling Errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
  //   res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});