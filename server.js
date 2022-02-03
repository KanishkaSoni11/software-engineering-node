const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT,function(){
	console.log("node is running");
});
