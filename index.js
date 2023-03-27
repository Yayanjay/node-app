require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const db = require('./src/configs/db')
const routes = require('./src/main')

const app = express();
const port = 3000;

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(routes)
db.connection()

app.get('/', (req, res) => {
    console.log(process.env.DATABASE_USERNAME);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})