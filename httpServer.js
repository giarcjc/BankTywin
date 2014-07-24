var http = require('http');
var async = require('async');
var redis = require('redis');
var jade = require('jade');

// set up Jade template
var layout = require('fs').readFileSync(__dirname + '/display.jade', 'utf8');
var fn = jade.compile(layout, {filename: __dirname + '/display.jade'});

// start Redis client
var client = redis.createClient();

// select second database
client.select(2);

// helper function
function makeCallbackFunc(member) {
   return function(callback) {
      client.hgetall(member, function(err, obj) {
         callback(err,obj);
      });
   };
}
http.createServer(function(req,res) {

   // first filter out icon request
   if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end();
      return;
   }
	
	// get all debtors in table
	 client.zrevrange('BankTywin',0,-1, function(err,result) {
      var balances;
      if (err) {
         console.log(err);
         res.end('List of Debtors is currently available, please check back');
         return;
      }
	
   // get balances, reverse order, top three only
/*    client.zrevrange('BankTywin',0,3, function(err,result) {
      var balances;
      if (err) {
         console.log(err);
         res.end('Top balances not currently available, please check back');
         return;
      } */

      // create array of callback functions for Async.series call
      var callFunctions = new Array();

      // process results with makeCallbackFunc, push newly returned
      // callback into array
      for (var i = 0; i < result.length; i++) {
         callFunctions.push(makeCallbackFunc(result[i]));
      }

      // using Async series to process each callback in turn and return
      // end result as array of objects
      async.series(
         callFunctions,
         function (err, result) {
            if (err) {
               console.log(err);
               res.end('Balances not available');
               return;
            }

            // pass object array to template engine
            var str = fn({balances : result});
            res.end(str);
       });
   });
}).listen(3000);

console.log('Server running on 3000/');
