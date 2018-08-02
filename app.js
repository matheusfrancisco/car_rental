var express = require('express')
var app = express()
var htpp = require('http').Server(app)

app.get('/',function(req,res){
	res.sendFile(_dirname + '/index.html')
})

app.use(express.static('img'))

http.listen(80, function(){
	console.log('Listening on port 80')
})
