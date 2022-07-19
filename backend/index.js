const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MONGODB_URL } = require('./config/config');
const userRoute = require('./src/controller/userController')
const trainRouter = require('./src/controller/trainsController');
const busRouter = require('./src/controller/busesController');
const { sampleDataImport } = require('./src/services/commonServices');
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req, res) {
  res.status(200).send({message: "Greetings !!!"});
});
 app.use('/user',userRoute);
 app.use('/train', trainRouter);

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.info('Database connected successfully!')
    app.listen(process.env.PORT || 3500, function() {
        console.log("Server running on port " + (process.env.PORT || "3500"));
        sampleDataImport();
    })
}).catch(err => {
  console.error('Database connection failed: ' + err.message);
  process.exit(1);
});