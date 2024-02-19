const express = require("express");
const globalError = require("./middlewares/erroMiddlewares")
const connectodb = require("./config/connectToDB")
const ApiError = require("./utils/apierro");
require("dotenv").config();


connectodb();

const app = express();
// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/question", require("./routes/questionRoute"));
app.use("/api/users", require("./routes/usersRoute"))

//handle err for routers
app.all('*' ,(req,res,next)=>{
  next(new ApiError (`cant find this rout:${req.originalUrl}` , 400));
})

//
app.use(globalError)



// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);