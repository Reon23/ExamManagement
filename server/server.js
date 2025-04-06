const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;

app.get("/", (req, res) => {
    console.log("Hello")
    res.send("Hello There!", 200)
});

app.listen(port, () => console.log(`Server started on : http://localhost:${port}`))