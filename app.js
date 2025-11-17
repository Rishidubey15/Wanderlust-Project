const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const chatbotRoutes = require('./routes/chatbot');
const logger = require('./utils/logger');
require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    logger.info("Connected to Mongodb Atlas");
  })
  .catch((err) => {
    logger.error(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}


app.use(cookieParser());

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "Thisisasecret";
app.use((req, res, next) => {
  let currUser = null;
  if (req.cookies && req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, SECRET);
      currUser = decoded;
    } catch (e) {
      currUser = null;
    }
  }
  res.locals.currUser = currUser;
  next();
});

app.use('/api/chatbot', chatbotRoutes);

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const bookingRouter = require("./routes/booking.js");
const userRouter = require("./routes/user.js");
const Strategy = require("passport-local");

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", bookingRouter);
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url, user: req.user?.username }, 'Incoming request');
  next();
});

app.use((err, req, res, next) => {
  logger.error({ err, url: req.url }, 'Unhandled error');
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});

app.listen(port, () => {
  logger.info(`Server is running at ${port}`);
});
