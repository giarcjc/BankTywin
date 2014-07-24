var net = require('net');
var redis = require('redis');
  console.log('ok gonna start...');
var server = net.createServer(function(conn) {
   console.log('connected');

   // create Redis client
   var client = redis.createClient();
	
   client.on('error', function(err) {
     console.log('Error ' + err);
   });

   // second database is BankTywin balance database
   client.select(2);
   conn.on('data', function(data) {
      console.log(data + ' from ' + conn.remoteAddress + ' ' +
        conn.remotePort);
      try {
         var obj = JSON.parse(data);

         // add or overwrite balance
         client.hset(obj.uid, "first_name", obj.first_name, redis.print);
         client.hset(obj.uid, "last_name", obj.last_name, redis.print);
         client.hset(obj.uid, "balance", obj.balance, redis.print);
         client.hset(obj.uid, "status", obj.status, redis.print);

         // add to balances for BankTywin
         client.zadd("BankTywin", parseInt(obj.balance), obj.uid);
      } catch(err) {
         console.log(err);
      }
   });
   conn.on('close', function() {
        console.log('client closed connection');
        client.quit();
   });

}).listen(8124);

console.log('listening on port 8124');
