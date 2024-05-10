const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const router = require("./routes/product.route");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

const app = express();

dotenv.config();

var corsOptions = {
	origin: '*', // Specify the origin domain
	optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(
	fileUpload({
		useTempFiles: true,
	}),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
