const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const router = require("./routes/product.route");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
	fileUpload({
		useTempFiles: true,
	}),
);

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

connectDB();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
