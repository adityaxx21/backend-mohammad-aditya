require('dotenv').config()
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const productRouter = require("./routes/productRoute");
const merchantRouter = require("./routes/merchantRoute");
const transactionRouter = require("./routes/transactionRoute");
const brandRouter = require("./routes/brandRoute");
const userRouter = require("./routes/userRoute");
const authMiddleware = require('./middleware/authMiddleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api/auth", userRouter);
app.use("/api/products", authMiddleware, productRouter);
app.use("/api/merchants", authMiddleware, merchantRouter);
app.use("/api/transactions", authMiddleware, transactionRouter);
app.use("/api/brands", authMiddleware, brandRouter);




const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
