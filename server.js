const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static("public"));

let projectData = [];

app.get('/allData', (req, res) => {
    res.send(projectData);
});


app.post('/addData', (req, res) => {
    projectData.push(req.body);
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));