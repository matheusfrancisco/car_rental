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

var io = require('socket.io')(http)
//new address alwys to connect
io.on('connection', function(socket){
	console.log('connection...')

	iota.api.getNewAddress(seed, options, function(error, newAddress){
		if(error){
			console.log(error)
		}
		else{
			console.log('New address generated:' + newAddress)
			const transfers=[{
				address:newAddress,
				value:0
			}]
			iota.api.sendTransfer(seed, 3,9,transfers,(error,sucess)=>{
				if (error) {
							console.log(error)

				}else{
							console.log(sucess)
							socket.emit('newaddress', newAddress)
							CheckBalance(newAddress, socket)

				}
			})
		}
	})
})

function CheckBalance(addressToCheck, socket)
{
    iota.api.getBalances([addressToCheck], 100, function(error, success){
        if(error || !success)
        {
            console.log(error)
        }
        if(!success.balances){
            console.log('Missing balances in response')
        }
        else
        {
            if(success.balances[0]>0)
            {
                socket.emit('unlocked', addressToCheck)
                console.log('Unlocked:'+ addressToCheck)
            }
            CheckBalance(addressToCheck, socket)
        }
    })
}