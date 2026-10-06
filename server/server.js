const express = require("express");
const cors = require("cors");
const path = require("path");
const qrRoutes = require("./routes/qr");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/qr", qrRoutes);

// serve the built react app
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
