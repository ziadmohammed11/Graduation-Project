const express = require("express");
const globalError = require("./middlewares/erroMiddlewares")
const connectodb = require("./config/connectToDB")
const ApiError = require("./utils/apiErro")
const xss =  require("xss-clean")
const cors = require("cors")

require("dotenv").config();


connectodb();

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
app.options('*' , cors())
// prevent xss attacks
app.use(xss());

// Route 
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/centers" , require("./routes/centerRoute"))
app.use("/api/child" , require("./routes/childRoute"))
app.use("/api/articles" , require("./routes/articlesRoute"))

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