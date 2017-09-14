const path = require('path');
const express = require('express');
const app = express();

console.log(__dirname + '/../public');
console.log();


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath)) //static middleware for public folder

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}.`);
})
