const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const router = require("./routes/product.route");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

const app = express();

dotenv.config();

app.use(cors());
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
