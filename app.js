var express = require('express');
var app = express();
var IOTA= require('iota.lib.js');
var iota = new IOTA({provider:'https://nodes.testnet.iota.org:443'})
const seed = 'JARHXTVEMDOJQSXAEVNKUCOKQBWDGAVNTHHVVVI9EAPIAILYZPUOYM9SLJ9KBLULIZLTJXRYPVEXEWAIG'

var options = {
	checksum:true,
	security:2
}


var http = require('http').Server(app);

app.get('/', function (req, res){
    res.sendFile(__dirname + "/index.html");
})


app.use(express.static('img'));

http.listen(8080, function (){
    console.log("Listening on *:8080")
})

iota.api.getNewAddress(seed, options, function(error, newAddress)){
	if(error){
		console.log(error)
	}
	else{
		console.log('New address generated:' + newAddress)
	}
}